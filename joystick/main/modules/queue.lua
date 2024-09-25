local M = {}

local function on_message_received(data)
    local event_name
    if data.event == websocket.EVENT_MESSAGE then
        local received_json = json.decode(data.message)
        if received_json.Type == 'UpdateSpotInLine' then
            _G.spot_in_line = received_json.SpotInLine
            event_name = 'update_queue'
        end
        if received_json.Type == 'LetJoystickIntoGame' then
            event_name = 'into_game'
            eventbus.unsubscribe('websocket_call', on_message_received)
        end
    end
    eventbus.publish(event_name, data)
end

local function on_enter_queue(data)
    eventbus.subscribe('websocket_call', on_message_received)
    eventbus.publish('queue_screen', data)
end

local function on_leave_queue()
    eventbus.subscribe('websocket_call', on_message_received)
    local message = { ForServer = true, Type = "LeaveQueue" }
    ws.send(message)
end

function M.init()
    eventbus.subscribe('into_queue', on_enter_queue)
    eventbus.subscribe('leave_queue', on_leave_queue)
end

function M.final()
    eventbus.unsubscribe('into_queue', on_enter_queue)
    eventbus.unsubscribe('leave_queue', on_leave_queue)
end

return M