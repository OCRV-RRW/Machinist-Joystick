colors = require("main.pipe.pipe_colors")

local M = {
    COLORS_TABLE = nil,
    STARTED = false
}

local function gen_colors()
    M.COLORS_TABLE = {}
    math.randomseed(os.time())
    local unused_colors = {}

    local choose_color = function ()
        if #unused_colors < 1 then
            pprint("WARNING: unused_colors table lenght < 1!!!!!")
            return nil
        end

        local rand_idx = math.random(1, #unused_colors)
        local color = unused_colors[rand_idx]
        table.remove(unused_colors, rand_idx)
        return color
    end

    for color, _ in pairs(colors) do
        if color ~= "NONE" then
            table.insert(unused_colors, color)
        end
    end

    while #unused_colors > 0 do
        if #unused_colors == 1 then
            local color = choose_color()
            if color then
                M.COLORS_TABLE[color] = color
            end
        elseif #unused_colors > 1 then
            local color_key = choose_color()
            local color_value = choose_color()
            if color_key and color_value then
                M.COLORS_TABLE[color_key] = color_value
            end
        end
    end
end

local function on_start_pipegame()
    gen_colors()
    local message = {
        ColorsTable = json.encode(M.COLORS_TABLE),
        Role = nil,
        ForServer = false,
        Type = "SendColorsPipeEvent"
    }
    ws.send(message)
    eventbus.publish('on_start_pipe_game')
    M.STARTED = true
end

---@param table_to_convert table
---@return table
local function convert_colors_table(table_to_convert)
    local result = {}
    for key, value in pairs(table_to_convert) do
        result[colors[key]] = colors[value]
    end
    return result
end

local function send_colors_table()
    if not M.COLORS_TABLE then return end
    local converted_colors_table = convert_colors_table(M.COLORS_TABLE)
    if _G.role == ws.ROLE_CHOOSER.ROLE.TCHMP then
        pprint("assistant")
        eventbus.publish('send_colors_table_to_pipe_game', converted_colors_table)
    elseif _G.role == ws.ROLE_CHOOSER.ROLE.TCHM then
        pprint("machinsit")
        eventbus.publish('send_colors_table_to_colors_view', converted_colors_table)
    end
end

local function on_success_game()
    pprint("repair")
    local message = {Id = _G.id, Role = _G.role, Type = "RepairFuse", ForServer = false}
    ws.send(message)
end

local function on_exit_game()
    local message = {Role = _G.role, Type = "ExitMiniGame", ForServer = false}
    ws.send(message)
    if _G.role == ws.ROLE_CHOOSER.ROLE.TCHMP then
        eventbus.publish('into_game')
    end
end

local function on_message_received(data)
    if data.event == websocket.EVENT_MESSAGE then
        local received_json = json.decode(data.message)
        if received_json.Type == 'StartPipeGame' then
            pprint('on_start_pipe_game')
            on_start_pipegame()
        end
        if received_json.Type == 'SendColorsPipeEvent' then
            pprint("dsds")
            M.COLORS_TABLE = json.decode(received_json.ColorsTable)
            send_colors_table()
        end
        if received_json.Type == 'ExitMiniGame' then
            M.COLORS_TABLE = nil
            M.STARTED = false
            eventbus.publish('on_exit_pipe_game') 
        end
    end
end

function M.init()
    eventbus.subscribe('websocket_call', on_message_received)
    eventbus.subscribe('repair_fuse', on_success_game)
    eventbus.subscribe('finish_mini_game', on_exit_game)
    eventbus.subscribe("get_colors_table", send_colors_table)
end

function M.final()
    eventbus.unsubscribe('websocket_call', on_message_received)
    eventbus.unsubscribe('repair_fuse', on_success_game)
    eventbus.unsubscribe('finish_mini_game', on_exit_game)
    eventbus.unsubscribe("get_colors_table", send_colors_table)
end

return M