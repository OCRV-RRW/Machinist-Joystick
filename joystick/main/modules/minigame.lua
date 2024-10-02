local M = {
}

local function on_finish_game()
    local message = {Role = _G.role, Type = "ExitMiniGame", ForServer = false}
    ws.send(message)
    if _G.role == ws.ROLE_CHOOSER.ROLE.TCHMP then
        eventbus.publish('into_game')
    end
end

local function on_repared_fuse()
   local message = {Id = _G.id, Role = _G.role, Type = "RepairFuse", ForServer = false}
   ws.send(message)
end

function M.init()
    eventbus.subscribe('repair_fuse', on_repared_fuse)
    eventbus.subscribe('finish_mini_game', on_finish_game)
end

function M.final()
    eventbus.unsubscribe('repair_fuse', on_repared_fuse)
    eventbus.unsubscribe('finish_mini_game', on_finish_game)
end

return ddM