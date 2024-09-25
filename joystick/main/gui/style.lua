local M = {}


M["button"] = {
	LONGTAP_TIME = 0.4,
	DOUBLETAP_TIME = 0.4,

	HOVER_MOUSE_IMAGE = "button_yellow",
	DEFAULT_IMAGE = "button_blue",
	HOVER_IMAGE = "button_red",

	on_hover = function(self, node, state)
		local scale = state and vmath.vector3(1.02) or vmath.vector3(1)
		gui.animate(node, 'scale', scale, go.EASING_INBOUNCE, .02)
	end,

	on_mouse_hover = function(self, node, state)
		local scale = state and vmath.vector3(1.01) or vmath.vector3(1)
		gui.set_scale(node, scale)
	end,

	on_set_enabled = function (self, node, state)
		local alpha = state and 1 or .6
		gui.set_alpha(node, alpha)
	end
}


return M