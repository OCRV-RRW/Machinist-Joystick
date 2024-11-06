local colors = {}

colors.NONE = -1
colors.RED = 0
colors.YELLOW = 1
colors.GREEN = 2
colors.BLUE = 3
colors.DARK = 4

---@param number integer
---@return string
function get_state(number)
    for key, value in pairs(colors) do
        if number == value then
            return key
        end
    end
    return "NONE"
end

return colors