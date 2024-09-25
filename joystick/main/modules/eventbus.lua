local event_bus = {}

local subscribers = {}

function event_bus.subscribe(event_name, handler)
	if not subscribers[event_name] then
		subscribers[event_name] = {}
	end
	table.insert(subscribers[event_name], handler)
end

function event_bus.unsubscribe(event_name, handler)
	if not subscribers[event_name] then return 
	else 
		for i, cb in ipairs(subscribers[event_name]) do
			if cb == handler then
				table.remove(subscribers[event_name], i)
				return
			end
		end
	end
end

function event_bus.publish(event_name, ...)
	if subscribers[event_name] then
		for _, handler in ipairs(subscribers[event_name]) do
			handler(...)
		end
	end
end

return event_bus