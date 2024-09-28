local M = {
	CONNECTION = nil,
	ROOM_JOINER = require('main.modules.roomjoiner'),
	ROLE_CHOOSER = require('main.modules.rolechooser'),
	QUEUE = require('main.modules.queue'),
	WALK = require('main.modules.walk'),
	TRAINCONTROL = require('main.modules.traincontrol'),
	MINIGAME = require('main.modules.minigame'),
	FEEDBACK = require('main.modules.feedback'),
	HOST = 'wss://ocrv-game.ru/v2.0/Joystick'
}

local function websocket_callback(self, conn, data)
	if data.event == websocket.EVENT_DISCONNECTED then
		pprint('Disconnected: ' .. tostring(conn))
		eventbus.publish('disconnected', conn)
		M.CONNECTION = nil
	elseif data.event == websocket.EVENT_CONNECTED then
		pprint('Connected: ' .. tostring(conn))
		eventbus.publish('connected', conn)
	elseif data.event == websocket.EVENT_ERROR then
		pprint('Error: "' .. data.message .. '"')
		if data.handshake_response then
			pprint('Handshake response status: "' .. tostring(data.handshake_response.status) .. '"')
			for k, v in pairs(data.handshake_response.headers) do
				pprint('Handshake response header: "' .. k .. ':' .. v .. '"')
			end
			pprint('Handshake response body: "' .. tostring(data.handshake_response.response) .. '"')
		end
		eventbus.publish('error', data)
	elseif data.event == websocket.EVENT_MESSAGE then
		pprint('Received: "' .. tostring(data.message) .. '"')
		eventbus.publish('received', data)
	end
	eventbus.publish('websocket_call', data)
end

local function connecting()
	local params = {
		timeout = 3000,
	}
	M.CONNECTION = websocket.connect(M.HOST, params, websocket_callback)
end

local function disconnecting()
	if M.CONNECTION ~= nil then
		pprint('Disconnecting ' .. tostring(M.CONNECTION))
		websocket.disconnect(M.CONNECTION)
	end
end

local function setup_event()
	pprint('websocket init')
	eventbus.subscribe('connecting', connecting)
	eventbus.subscribe('disconnecting', disconnecting)
	eventbus.subscribe('join_room_error', disconnecting)
end

local function drop_events()
	eventbus.unsubscribe('connecting', connecting)
	eventbus.unsubscribe('disconnecting', disconnecting)
	eventbus.unsubscribe('join_room_error', disconnecting)
end

function M.init()
	M.ROLE_CHOOSER.init()
	M.ROOM_JOINER.init()
	M.QUEUE.init()
	M.WALK.init()
	M.TRAINCONTROL.init()
	M.MINIGAME.init()
	M.FEEDBACK.init()
	setup_event()
end

function M.send(message)
	if M.CONNECTION then
		message = json.encode(message)
		websocket.send(M.CONNECTION, message, { type = websocket.DATA_TYPE_TEXT })
		eventbus.publish('send', message)
	end
end

function M.dispose()
	drop_events()
	M.FEEDBACK.final()
	M.MINIGAME.final()
	M.WALK.final()
	M.QUEUE.final()
	M.ROLE_CHOOSER.final()
	M.ROOM_JOINER.final()
	M.TRAINCONTROL.final()
end

return M
