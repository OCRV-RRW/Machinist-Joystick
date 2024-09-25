local M = {
    
}

local function on_message_received(data)
    local event_name
    if data.event == websocket.EVENT_MESSAGE then
        local received_json = json.decode(data.message)
    end
end

local function on_leave_control()
    local message = {ForServer = false, Type = "LeaveControlPanel", Role = "Machinist"}
    ws.send(message)
    M.final()
end

function M.init()
    eventbus.subscribe('into_game', on_leave_control)
    eventbus.subscribe('websocket_call', on_message_received)
end

function M.final()
    eventbus.unsubscribe('into_game', on_leave_control)
    eventbus.unsubscribe('websocket_call', on_message_received)
end

return M