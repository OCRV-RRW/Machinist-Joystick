local M = {
    LEFT = 'left',
    RIGHT = 'right',
    INTERACTION = 'interaction',
    PHASE = {
        DOWN = 'down',
        UP = 'up',
        CLICK = 'click'
    }
}

local function on_message_received(data)
    local event_name
    if data.event == websocket.EVENT_MESSAGE then
        local received_json = json.decode(data.message)
        if received_json.Type == 'OpenTrainControlPanel' then
            _G.CRANE = received_json.Crane
            _G.CONTROLLER = received_json.Controller
            eventbus.publish('train_control', data)
        end
    end
end

local function on_move_interact(args)
    local message = {
        Right = args.key == M.RIGHT and args.phase == M.PHASE.DOWN,
        Left = args.key == M.LEFT and args.phase == M.PHASE.DOWN,
        Interact = args.key == M.INTERACTION and args.phase == M.PHASE.DOWN,
        Role = nil,
        ForServer = false,
        Type = "MovementEvent"
    }
    ws.send(message)
end

function M.init()
    eventbus.subscribe('move_interact', on_move_interact)
    eventbus.subscribe('websocket_call', on_message_received)
end

function M.final()
    eventbus.unsubscribe('websocket_call', on_message_received)
    eventbus.unsubscribe('move_interact', on_move_interact)
end

return M
