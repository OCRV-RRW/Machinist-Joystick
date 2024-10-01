local M = {
    URL = 'https://ocrv-game.ru/feedback/api/v1/feedback'
}

local  function return_to_main()
    msg.post(bootstrap_url, 'connection_menu')
    eventbus.publish('disconnected')
end

local function on_message_received(data)
    local event_name
    if data.event == websocket.EVENT_MESSAGE then
        local received_json = json.decode(data.message)
        if received_json.Type == 'RequestFeedback' then
            local url = M.URL .. '/' .. _G.UUID
            eventbus.publish('start_loading')
            http.request(url, 'GET', function(self, id, response)
                pprint(response)
                eventbus.publish('finish_loading')
                if response.status == 404 then
                    eventbus.publish('feedback')
                else
                    return_to_main()
                end
            end, {['Access-Control-Allow-Origin'] = "*", ["Content-Type"] = 'application/json'})
        end
    end
end

local function send_feedback()
    local body = json.encode({ id = _G.UUID, userName = _G.UUID, score = _G.rate, message = _G.rate_message })
    local headers = {["Content-Type"] = "application/json"}
    local method = 'POST'
    eventbus.publish('start_loading')
    pprint(method .. ' to ' .. M.URL .. ' body:' .. tostring(body))
    http.request(M.URL, method, function(self, id, response)
        eventbus.publish('finish_loading')
        pprint(id, response)
        return_to_main()
        end, headers, body)
end

function M.switch_on()
    eventbus.subscribe('send_feedback', send_feedback)
end

function M.switch_off()
    eventbus.unsubscribe('send_feedback', send_feedback)
    sys.get_sys_info()
end

function M.init()
    local id = sys.load('id')
    if id.uuid == nil then
        id = { uuid = M.generate_uuid() }
        sys.save('id', id)
        pprint('generated uuid ' .. id.uuid)
    end
    _G.UUID = id.uuid
    eventbus.subscribe('websocket_call', on_message_received)
end

function M.final()
    eventbus.unsubscribe('websocket_call', on_message_received)
end

function M.generate_uuid()
    math.randomseed(os.time())
    local template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    return string.gsub(template, '[xy]', function(c)
        local v = (c == 'x') and math.random(0, 0xf) or math.random(8, 0xb)
        return string.format('%x', v)
    end)
end

return M
