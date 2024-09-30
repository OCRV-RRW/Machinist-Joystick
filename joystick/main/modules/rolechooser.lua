local M = {
    ROLE = {
        TCHM = 'Machinist',
        TCHMP = 'Assistant'
    }
}

local function on_message_received(data)
    local event_name
    if data.event == websocket.EVENT_MESSAGE then
        local received_json = json.decode(data.message)
        if received_json.Type == 'EnterQueueResponse' then
            event_name = 'into_queue'
            eventbus.unsubscribe('websocket_call', on_message_received)
        end
        if received_json.Type == 'UpdateSpotInLine' then
            _G.spot_in_line = received_json.SpotInLine
            return
        end
        if received_json.Type == 'LetJoystickIntoGame' then
            event_name = 'into_game'
            eventbus.unsubscribe('websocket_call', on_message_received)
        end
    end
    if event_name then
        pprint("publish " .. event_name)
        eventbus.publish(event_name, data)
    end
end

local function on_choosed_role(role)
    local message = { Role = role, ForServer = true, Type = "EnterQueueRequest" }
    eventbus.subscribe('websocket_call', on_message_received)
    ws.send(message)
end

function M.init()
    eventbus.subscribe('selected_role', on_choosed_role)
end

function M.final()
    eventbus.unsubscribe('selected_role', on_choosed_role)
end

return M
