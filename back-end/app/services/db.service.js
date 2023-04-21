const saveData=async (Model)=>{
    return Model.save();
}

const findData=async (Model)=>{
    return Model.find();
}

const findDataById=async (Model,id)=>{
    return Model.findById(id)
}

const updateData= async (Model,id,data)=>{
    return Model.findByIdAndUpdate()
}

const deleteData=async (Model)=>{
    return Model.findByIdAndRemove()
}

module.exports={
    saveData,
    findData,
    findDataById,
    updateData,
    deleteData
}
