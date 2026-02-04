import Product from "../models/products.model.js";
import User from "../models/users.model.js";

export const getDashboardData = async (req, res) => {
  try {
    // 1. Get Product Stats using a single aggregation pipeline
    const productStats = await Product.aggregate([
      {
        $facet: {
          // Total count of all products
          totalCount: [{ $count: "count" }],
          
          // Count products per category
          categoryDist: [
            { $group: { _id: "$category", count: { $sum: 1 } } }
          ],
          
          // Filter for low stock items
          lowStock: [
            { $match: { quantity: { $lt: 10 } } },
            { $project: { name: 1, quantity: 1, price: 1 } } // Only return needed fields
          ]
        }
      }
    ]);

    // 2. Get User Stats (Users are a different collection, so we call it separately)
    const userStats = await User.aggregate([
      {
        $facet: {
          totalUsers: [{ $count: "count" }],
          roles: [
            { $group: { _id: "$role", count: { $sum: 1 } } }
          ]
        }
      }
    ]);

    // 3. Get Recent Products (Still best as a simple find/sort)
    const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(5);

    // Format the response for the frontend
    res.status(200).json({
      success: true,
      products: {
        total: productStats[0].totalCount[0]?.count || 0,
        categories: productStats[0].categoryDist,
        lowStock: productStats[0].lowStock,
        recent: recentProducts
      },
      users: {
        total: userStats[0].totalUsers[0]?.count || 0,
        roleDistribution: userStats[0].roles
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};