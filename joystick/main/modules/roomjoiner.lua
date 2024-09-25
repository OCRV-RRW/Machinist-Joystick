local M = {PAGE_URL = nil}

local function on_message_received(data)
    eventbus.unsubscribe('websocket_call', on_message_received)
    local event_name
    if data.event == websocket.EVENT_MESSAGE then
        local received_json = json.decode(data.message)
        if not received_json.IsSuchRoom then
            event_name = 'join_room_error'
        else
            event_name = 'join_room_success'
        end
    else
        event_name = 'join_room_success'
    end
    eventbus.publish(event_name, data)
end

local function on_host_connected()
    if M.ROOM_NAME == '' then
        eventbus.publish('join_room_error')
        return
    end
    eventbus.subscribe('websocket_call', on_message_received)
    local message = { RoomName = M.ROOM_NAME, ForServer = true, Type = "JoinRoomRequest" }
    ws.send(message)
end

function string:split(inputstr, sep)
    if sep == nil then
        sep = "%s"
    end
    local t = {}
    if inputstr ~= nil then
        for str in string.gmatch(inputstr, "([^" .. sep .. "]+)") do
            table.insert(t, str)
        end
    end
    return t
end

function M.init()
    if html5 then
        M.PAGE_URL = html5.run("window.location")
    else
        M.PAGE_URL = ""
    end
    local split = string:split(M.PAGE_URL, '/')
    local room_name = string:split(split[table.maxn(split)], '=')

    M.ROOM_NAME = room_name[2] or 'd7c28e8d-6872-41ad-924c-1d4dae9c418c'
    eventbus.subscribe('connected', on_host_connected)
end

function M.final()
    eventbus.unsubscribe('connected', on_host_connected)
end

return M
