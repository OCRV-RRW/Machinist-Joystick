local M = {}

local function on_choosed_role(role)
    local message = { Role = role, ForServer = true, Type = "EnterQueueRequest" }
    ws.send(message)
end

function M.init()
    eventbus.subscribe('choose_role', on_choosed_role)
end

function M.final()
    eventbus.unsubscribe('choose_role', on_choosed_role)
end

return M
