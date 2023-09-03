local QBCore = exports['qb-core']:GetCoreObject()
local defaultdata = Config.DefaultSettings

QBCore.Commands.Add('cash', 'Check Cash Balance', {}, false, function(source, _)
    local Player = QBCore.Functions.GetPlayer(source)
    local cashamount = Player.PlayerData.money.cash
    
    TriggerClientEvent('QBCore:Notify', source, 'Пари: $'..cashamount)
end)

QBCore.Commands.Add('bank', 'Check Bank Balance', {}, false, function(source, _)
    local Player = QBCore.Functions.GetPlayer(source)
    local bankamount = Player.PlayerData.money.bank

    TriggerClientEvent('QBCore:Notify', source, 'Банка: $'..bankamount)
end)

RegisterNetEvent('hud:server:GainStress', function(amount)
    if Config.DisableStress then return end
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    local Job = Player.PlayerData.job.name
    local JobType = Player.PlayerData.job.type
    local newStress
    if not Player or Config.WhitelistedJobs[JobType] or Config.WhitelistedJobs[Job] then return end
    if not ResetStress then
        if not Player.PlayerData.metadata['stress'] then
            Player.PlayerData.metadata['stress'] = 0
        end
        newStress = Player.PlayerData.metadata['stress'] + amount
        if newStress <= 0 then newStress = 0 end
    else
        newStress = 0
    end
    if newStress > 100 then
        newStress = 100
    end
    Player.Functions.SetMetaData('stress', newStress)
    TriggerClientEvent('hud:client:UpdateStress', src, newStress)
    TriggerClientEvent('QBCore:Notify', src, Lang:t("notify.stress_gain"), 'error', 1500)
end)

RegisterNetEvent('hud:server:RelieveStress', function(amount)
    if Config.DisableStress then return end
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    local newStress
    if not Player then return end
    if not ResetStress then
        if not Player.PlayerData.metadata['stress'] then
            Player.PlayerData.metadata['stress'] = 0
        end
        newStress = Player.PlayerData.metadata['stress'] - amount
        if newStress <= 0 then newStress = 0 end
    else
        newStress = 0
    end
    if newStress > 100 then
        newStress = 100
    end
    Player.Functions.SetMetaData('stress', newStress)
    TriggerClientEvent('hud:client:UpdateStress', src, newStress)
    TriggerClientEvent('QBCore:Notify', src, Lang:t("notify.stress_removed"))
end)

QBCore.Functions.CreateCallback('hud:server:getMenu', function(_, cb)
    cb(Config.Menu)
end)

RegisterServerEvent('qb-hud:get:data', function()
	local scr = source
    local huddata = json.decode(LoadResourceFile(GetCurrentResourceName(), "./huddata.json"))
    local identifier = GetPlayerIdentifiers(scr)[1]
    local data = false

    for k, v in pairs(huddata) do
        if v.identifier == identifier then
            data = {identifier = identifier, minimap = v.minimap, houseblips = v.houseblips, shopblips = v.shopblips, gasblips = v.gasblips, alwaysminimap = v.alwaysminimap}

            TriggerClientEvent('qb-hud:get:data', scr, data)

            return
        end
    end

    defaultdata.identifier = identifier

    table.insert(huddata, defaultdata)

    SaveResourceFile(GetCurrentResourceName(), "./huddata.json", json.encode(huddata), -1)

    TriggerClientEvent('qb-hud:get:data', scr, defaultdata)
end)

RegisterServerEvent('qb-hud:update', function(settings)
    local scr = source
    local huddata = json.decode(LoadResourceFile(GetCurrentResourceName(), "./huddata.json"))
    local identifier = GetPlayerIdentifiers(scr)[1]

    settings.identifier = identifier

    for k, v in pairs(huddata) do
        if identifier == v.identifier then
            huddata[k] = settings
        end
    end

    SaveResourceFile(GetCurrentResourceName(), "./huddata.json", json.encode(huddata), -1)
end)