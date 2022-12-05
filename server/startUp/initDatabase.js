const Profession = require('../models/ProfessionModel')
const Quality = require('../models/QualitiesModel')
const professionsMockData = require('../mock/professions.json')
const qualitiesMockData = require('../mock/qualities.json')

module.exports = async () => {
    const professions = await Profession.find()
    if (professions.length !== professionsMockData.length) {
        await createInitialEntity(Profession, professionsMockData)
    }
    const qualities = await Quality.find()
    if (qualities.length !== qualitiesMockData.length) {
        await createInitialEntity(Quality, qualitiesMockData)
    }
}

async function createInitialEntity(Model, data) {
    await Model.collection.drop()
    return Promise.all(
        data.map(async item => {
            try {
                delete item._id
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            } catch (error) {
                return error
            }
        })
    )
}