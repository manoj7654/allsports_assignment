const Category = require("../modal/categoryModal");
const  {Product}  = require("../modal/productModal");

// getting all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({ include: Category });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// for getting particular products
const getProductById = async (req, res) => {
    const id=req.params.id
    try {
        const product = await Product.findByPk(id, { include: Category });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


// for creating products
const createProduct = async (req, res) => {
    try {
        const { name, description, price, categoryId } = req.body;
        const product = await Product.create({ name, description, price, categoryId,userId:req.userId });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


// for updating products
const updateProduct = async (req, res) => {
    const id=req.params.id
    try {
        const { name, description, price, categoryId } = req.body;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await product.update({ name, description, price, categoryId });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


// for deleting products
const deleteProduct = async (req, res) => {
    const id=req.params.id
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await product.destroy();
        res.status(200).json({message:"product has been deleted"});
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports={
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}