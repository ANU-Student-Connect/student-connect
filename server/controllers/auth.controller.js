export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
    } catch (error) {
        res.status(500)
    }
}

export const login = async (req, res) => {
    res.send('login');
}

export const logout = async (req, res) => {
    res.send('logout');
}