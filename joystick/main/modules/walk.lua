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
end

function M.final()
    eventbus.unsubscribe('move_interact', on_move_interact)
end

return M
