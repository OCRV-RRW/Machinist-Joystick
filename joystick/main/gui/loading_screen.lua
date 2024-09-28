local M = {}

local function on_loading_start()
	msg.post('.', 'show_loading')	
end

local function on_loading_finish()
	msg.post('.', 'hide_loading')
end

local function show_loading(self)
	if self.show_anim then
		gui.cancel_animation(self.root, 'color.w')
		self.show_anim = nil
	end
	gui.set_enabled(self.root, true)
	self.show_anim = gui.animate(self.root, 'color.w', .3, gui.EASING_LINEAR, .1)
	self.circle_anim = gui.animate(self.circle, gui.PROP_EULER, vmath.vector3(0, 0, 360), gui.EASING_LINEAR, 1, 0, nil, gui.PLAYBACK_LOOP_BACKWARD)
end

local function hide_loading(self)
	if self.show_anim then
		gui.cancel_animation(self.root, 'color.w')
		self.show_anim = nil
	end
	self.show_anim = gui.animate(self.root, 'color.w', 0, gui.EASING_LINEAR, .1, 0, function ()
		gui.set_enabled(self.root, false)
		gui.cancel_animation(self.circle, gui.PROP_EULER)
	end)
end

function M.init(self, template_name)
	self.root = gui.get_node(template_name .. '/loading')
	self.circle = gui.get_node(template_name .. '/circle')
	eventbus.subscribe('start_loading', on_loading_start)
	eventbus.subscribe('finish_loading', on_loading_finish)
	eventbus.publish('finish_loading')
end

function M.final(self)
	eventbus.unsubscribe('start_loading', on_loading_start)
	eventbus.unsubscribe('finish_loading', on_loading_finish)
end

function M.on_message(self, message_id, message, sender)
	if message_id == hash('show_loading') then
		show_loading(self)
	end
	if message_id == hash('hide_loading') then
		hide_loading(self)
	end
end

return M