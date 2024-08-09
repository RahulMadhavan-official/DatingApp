const login=async(req,res)=>{

    const { username, password } = req.body;

    console.log(req.body)
    
    if (username === 'learnbuds' && password === 'learnbuds') {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }


}

module.exports= {login
};