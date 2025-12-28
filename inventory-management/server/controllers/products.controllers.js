import Product from "../models/products.model.js";
import cloudinaryClient from "../utils/cloudinaryClient.js";

export async function createProduct(req, res) {
    try {
        const { name, description, price, category, quantity } = req.body;
        if (!name || !price || !category || !quantity) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        if(description && description.length > 500){
            return res.status(400).json({ message: "Description too long" });
        }
        if(!description)
        {
            description = "";
        }
        const numQuantity = parseInt(quantity, 10);
        if (isNaN(numQuantity) || numQuantity < 0) {
            return res.status(400).json({ message: "Invalid quantity" });
        }
        const numPrice = Number(price);
        const validCategory = ["Electronics", "Clothing", "Books"];
        if(!validCategory.includes(category)){
            return res.status(400).json({ message: "Invalid category" });
        }
        // const imageFile = req.imageFile.buffer;

        const byteArrayBuffer = req.file.buffer;
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinaryClient.uploader.upload_stream({
                folder: "products",
            },(error, uploadResult) => {
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

// function readAllProducts(req, res) {}
// function updateProduct(req, res) {}

// function deleteProduct(req, res) {}

// export { createProduct, readAllProducts, updateProduct, deleteProduct };



