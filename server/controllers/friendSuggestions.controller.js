import User from '../models/user.model';

export const getFriendSuggestions = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const user = await User.findById(userId);

        res.status(200).json(user);
    } catch (error) {
        console.error('Error in getFriendSuggestions controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

