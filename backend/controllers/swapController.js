const Swap = require('../models/Swap');

// Mock data as fallback
let mockSwaps = [
  { _id: '101', itemName: 'Old College Textbooks', materials: 'Paper', description: 'Engineering Math books, good condition. Looking to swap for physics books.', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80', price: 15, user: 'Student A', createdAt: new Date() },
  { _id: '102', itemName: 'Reusable Coffee Cup', materials: 'Glass/Silicone', description: 'Never used. Swap for a tote bag.', image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=300&q=80', price: 5, user: 'EcoWarrior', createdAt: new Date() }
];

exports.getSwaps = async (req, res) => {
  try {
    const swaps = await Swap.find().sort({ createdAt: -1 });
    res.json([...swaps, ...mockSwaps]);
  } catch (err) {
    res.json(mockSwaps);
  }
};

exports.addSwap = async (req, res) => {
  try {
    const { itemName, materials, description, image, price } = req.body;
    const newSwap = new Swap({ itemName, materials, description, image, price, user: 'Community Member' });
    await newSwap.save();
    res.status(201).json(newSwap);
  } catch (err) {
    // simple memory push if db is offline
    const fakeSwap = { 
        _id: Date.now().toString(), 
        itemName: req.body.itemName,
        materials: req.body.materials,
        description: req.body.description, 
        image: req.body.image,
        price: req.body.price,
        user: 'Community Member', 
        createdAt: new Date() 
    };
    mockSwaps.unshift(fakeSwap);
    res.status(201).json(fakeSwap);
  }
};
