const Category  = require('../modal/categoryModal');

// for getting all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// for getting particular category
const getCategoryById = async (req, res) => {
    const id=req.params.id
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// fro creating category
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.create({ name,userId:req.userId});
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// for updating category
const updateCategory = async (req, res) => {
    const id=req.params.id
    try {
        const { name } = req.body;
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        await category.update({ name });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


// for deleting category
const deleteCategory = async (req, res) => {
    const id=req.params.id
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        await category.destroy();
        res.status(200).json({"message":"Category has been deleted"});
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports={
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}