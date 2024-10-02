local M = {
    
}

local function on_message_received(data)
    local event_name
    if data.event == websocket.EVENT_MESSAGE then
        local received_json = json.decode(data.message)
    end
end

local function on_leave_control()
    pprint("leave control panel ")
    if _G.role == ws.ROLE_CHOOSER.ROLE.TCHM then
        local message = {ForServer = false, Type = "LeaveControlPanel", Role = _G.role}
        ws.send(message)
    end
end

local function send_control_state()
    local message = {Crane = _G.crane, Controller = _G.controller, Role = _G.role, Type = "TrainMovement", ForServer = false}
    ws.send(message)
end

function M.switch_on()
    eventbus.subscribe('websocket_call', on_message_received)
    eventbus.subscribe('change_train_controller', send_control_state)
end

function M.switch_off()
    eventbus.unsubscribe('change_train_controller', send_control_state)
    eventbus.unsubscribe('websocket_call', on_message_received)
end

function M.init()
   eventbus.subscribe('into_game', on_leave_control)
end

function M.final()
   eventbus.unsubscribe('into_game', on_leave_control)
end

return M