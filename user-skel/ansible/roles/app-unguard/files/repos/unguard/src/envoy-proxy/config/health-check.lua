local H = {}
local os = require('os')
local string = require('string')

-- decode spaces ('+') and hex-encoded characters
local function urldecode(s)
    local hex2char = function(x)
        return string.char(tonumber(x, 16))
    end
    return s:gsub('+', ' '):gsub('%%(%x%x)', hex2char)
end

-- parse the query parameters of an URL
local function parseparams(url)
    local params = {}
    for k, v in url:gmatch('([^&=?]+)=([^&=?]+)') do
        params[k] = urldecode(v)
    end
    return params
end

-- perform a health check via curl
function H.check(url)
    local path = parseparams(url)["path"]
    -- the following line is VULNERABLE to COMMAND INJECTION ATTACKS
    local code = os.execute("curl -m 15 -I " .. path)
    return code
end

return setmetatable(H, {
    __call = function(self, url)
        return self.check(url)
    end
})
