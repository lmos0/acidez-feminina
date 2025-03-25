const User = require('../model/User')
const axios = require('axios')

const jwt = require('jsonwebtoken')

require('dotenv').config()

// const API_KEY = process.env.GOOGLE_API_KEY;
// const CX = process.env.GOOGLE_CX;

async function searchProfiles(req, res) {
    try {
        const { company, title1, title2 } = req.body;
        
       
        if (!company || !title1) {
          return res.status(400).json({ 
            success: false, 
            message: 'Company and at least one title are required' 
          });
        }
    
        // API configuration
        const apiKey = process.env.GOOGLE_API_KEY; 
        const cx = process.env.GOOGLE_CX; 
        
        if (!apiKey || !cx) {
          return res.status(500).json({ 
            success: false, 
            message: 'Server configuration error' 
          });
        }
    
        // Construct search query
        let searchQuery = `site:linkedin.com/in/`;
    
        if (title1 && title2) {
          searchQuery += ` ("${title1}" OR "${title2}")`;
        } else {
          searchQuery += ` "${title1}"`;
        }
    
        searchQuery += ` intitle:"${company}"`;
    
        // Collect all results with pagination
        let allResults = [];
        let currentPage = 1;
        const maxPages = 10; 
        
        while (currentPage <= maxPages) {
          const start = (currentPage - 1) * 10 + 1;
          const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(searchQuery)}&key=${apiKey}&cx=${cx}&start=${start}`;
          
          const response = await axios.get(apiUrl);
          const data = response.data;
          
          if (data.items && data.items.length > 0) {
            // Process and clean the data before sending
            const processedResults = data.items.map(item => ({
              title: item.title,
              link: item.link,
              snippet: item.snippet || ''
            }));
            
            allResults = [...allResults, ...processedResults];
            currentPage++;
            
            // Break if we've reached the end of results
            if (!data.queries || !data.queries.nextPage) {
              break;
            }
          } else {
            break;
          }
          
          // delay to avoid hitting rate limits
          await new Promise(resolve => setTimeout(resolve, 300));
        }
    
        //results
        return res.status(200).json({
          success: true,
          count: allResults.length,
          results: allResults
        });
        
      } catch (error) {
        console.error('LinkedIn search error:', error);
        
        // 
        if (error.response && error.response.status === 429) {
          return res.status(429).json({
            success: false,
            message: 'Rate limit exceeded. Please try again later.'
          });
        } else if (error.response && error.response.status === 403) {
          return res.status(403).json({
            success: false,
            message: 'API quota exceeded or invalid credentials.'
          });
        }
        
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
      }
    };


async function login(req,res) {
    const {email, password} = req.body;

    try {
        // verificar se o usuário existe
        const user = await User.findOne({where: {email}});

        if(!user){
            return res.status(401).json({error: "Usuário não encontrado"});
        }

        // verificar se a senha está correta
        if(user.password !== password){
            return res.status(401).json({error: "Senha incorreta"});
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.cookie('authToken', token, {
            httpOnly: true,  // O token não pode ser acessado por JavaScript
            secure: process.env.NODE_ENV === 'production',  
            sameSite: 'Strict',  // Prevenir CSRF
            maxAge: 3600000  
        });

        res.status(200).json({ token })
        
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        return res.status(500).json({error: "Erro ao fazer login"});
        
    }
    

}

module.exports = {searchProfiles, login}