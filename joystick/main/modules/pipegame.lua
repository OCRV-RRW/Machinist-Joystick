colors = require("main.pipe.pipe_colors")

local M = {
    COLORS_TABLE = nil,
    GRID_TABLE = nil,
    STARTED = false,
    NUMBER_LEVEL = -1
}

---@param table_to_convert table
---@return table
function Convert_colors_table(table_to_convert)
    local result = {}
    for key, value in pairs(table_to_convert) do
        result[colors[key]] = colors[value]
    end
    return result
end


local function gen()
    M.COLORS_TABLE = {}
    M.GRID_TABLE = {}
    math.randomseed(os.time())
    M.NUMBER_LEVEL = math.random(5)
end

local function on_start_pipegame()
    if (_G.role == ws.ROLE_CHOOSER.ROLE.TCHMP) then
        gen()
        local message = {
            NumberLevel = M.NUMBER_LEVEL,
            Role = nil,
            ForServer = false,
            Type = "SendPipeGameDataEvent"
        }
        ws.send(message)
    end
    if (_G.role == ws.ROLE_CHOOSER.ROLE.TCHM) then
        eventbus.publish('on_start_pipe_game')
    end
    M.STARTED = true
end

local function send_pipe_game_data()
    if M.NUMBER_LEVEL == -1 then return end
    pprint("module")
	pprint(tostring(M.NUMBER_LEVEL))
    eventbus.publish('send_pipe_game_data', M.NUMBER_LEVEL)
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
        if received_json.Type == 'SendPipeGameDataEvent' then
            pprint("dsds")
            if (_G.role == ws.ROLE_CHOOSER.ROLE.TCHM) then
                M.NUMBER_LEVEL = received_json.NumberLevel
            end
        end
        if received_json.Type == 'ExitMiniGame' then
            M.NUMBER_LEVEL = -1
            M.STARTED = false
            eventbus.publish('on_exit_pipe_game') 
        end
    end
end

function M.init()
    eventbus.subscribe('websocket_call', on_message_received)
    eventbus.subscribe('repair_fuse', on_success_game)
    eventbus.subscribe('finish_mini_game', on_exit_game)
    eventbus.subscribe("get_pipe_game_data", send_pipe_game_data)
end

function M.final()
    eventbus.unsubscribe('websocket_call', on_message_received)
    eventbus.unsubscribe('repair_fuse', on_success_game)
    eventbus.unsubscribe('finish_mini_game', on_exit_game)
    eventbus.unsubscribe("get_pipe_game_data", send_pipe_game_data)
end

return M