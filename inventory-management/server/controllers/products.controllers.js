import Product from "../models/products.model.js";
import cloudinaryClient from "../utils/cloudinaryClient.js";

export async function createProduct(req, res) {
    try {
        const { name, description, price, category, quantity } = req.body;
        if (!name || !price || !category || !quantity) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        if (description && description.length > 500) {
            return res.status(400).json({ message: "Description too long" });
        }
        if (!description) {
            description = "";
        }
        const numQuantity = parseInt(quantity, 10);
        if (isNaN(numQuantity) || numQuantity < 0) {
            return res.status(400).json({ message: "Invalid quantity" });
        }
        const numPrice = Number(price);
        const validCategory = ["Electronics", "Clothing", "Books"];
        if (!validCategory.includes(category)) {
            return res.status(400).json({ message: "Invalid category" });
        }
        // const imageFile = req.imageFile.buffer;

        const byteArrayBuffer = req.file.buffer;
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinaryClient.uploader.upload_stream({
                folder: "products",
            }, (error, uploadResult) => {
                if (error) {
                    return reject(error);
                }
                return resolve(uploadResult);
            }).end(byteArrayBuffer);
        });

        console.log("Upload Result:", uploadResult);

        const newProduct = new Product({
            name,
            description,
            price: numPrice,
            category,
            quantity: numQuantity,
            imageUrl: uploadResult.secure_url,
            cloudinaryId: uploadResult.public_id,
        });

        await newProduct.save();

        return res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({ message: "Internal server error" });


    }


}

export async function readAllProducts(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    // const skip = (page - 1) * limit;

    // const products = await Product.find().skip(skip).limit(limit);
    const result = await Product.aggregate([
        { $sort: { createdAt: -1 } },       // sort
        {
            $facet: {
                products: [{ $skip: (page - 1) * limit }, { $limit: limit }],
                totalCount: [{ $count: "count" }]
            }
        }
    ]);

    res.status(200).json({ totalProducts: result[0].totalCount[0] ? result[0].totalCount[0].count : 0, products: result[0].products });

}


export async function updateProduct(req, res) {
    try {
        const { id } = req.params;

        const updateData = {
            ...req.body
        };
        // const updatedData = {};
        // If new image uploaded
        if (req.file) {
            // 1️⃣ Get old image publicId ONLY
            const product = await Product.findById(id).select("cloudinaryId");
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            if (product?.cloudinaryId) {
                await cloudinary.uploader.destroy(product.cloudinaryId);
            }

            // 2️⃣ Upload new image
            // const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            //     folder: "products"
            // });

            const uploadResult = await new Promise((resolve, reject) => {
                cloudinaryClient.uploader.upload_stream({
                    folder: "products",
                }, (error, uploadResult) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(uploadResult);
                }).end(req.file.buffer);
            });

            updateData.imageUrl = uploadResult.secure_url;
            updateData.cloudinaryId = uploadResult.public_id;
        }

        // 3️⃣ Single DB update
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true } // mongoose return new document after updation
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while updating product" });
    }
}


export async function deleteProduct(req, res) {

    const { id } = req.params;
    try{
        const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    if (product.cloudinaryId) {
        await cloudinaryClient.uploader.destroy(product.cloudinaryId);
    }
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ message: "Internal server error while deleting" });
    }
}

// export { createProduct, readAllProducts, updateProduct, deleteProduct };



