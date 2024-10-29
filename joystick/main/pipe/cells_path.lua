cells_pathes = {}

function get_path_by_cell(cell) 
    for _, path in ipairs(cells_pathes) do
        for _, c in ipairs(path) do
            if c == cell then
                return path
            end
        end
    end
    return nil
end

function cells_pathes.add_path(path) 
    if cells_pathes then
        table.insert(cells_pathes, path)
    end
end

function cells_pathes.try_add_cell(cell) 
    local path = cells_pathes.get_last_path();
    if path then 
        for _, value in ipairs(path) do
            if value == cell then
                return
            end
        end
        table.insert(path, cell) 
    end
end

function cells_pathes.get_last_path()
    return cells_pathes[#cells_pathes]
end

function cells_pathes.clear_path(path) 
    for index, value in pairs(cells_pathes) do
        if value == path then
            table.remove(cells_pathes, index)
        end
    end
end

return cells_pathes
