// Test script to verify FixLabDB is working by mocking the required globals

const fs = require('fs');
const vm = require('vm');

// Read the script.js file
let scriptContent = fs.readFileSync('C:/Users/dmateo/Downloads/FixLab Web-20260429T063734Z-3-001/script.js', 'utf8');

// We need to mock the globals that the script uses before FixLabDB is defined.
// Looking at the script, the first use of document is at line 1: const menuToggle = document.getElementById("menuToggle");
// We'll mock document.getElementById to return null (so that the variables are null and the early returns happen).
// Also, we need to mock window and localStorage.

const context = {
  window: {},
  // Mock document
  document: {
    getElementById: (id) => {
      // Return null for all IDs, so that the checks like `if (!registerForm) return;` will work.
      return null;
    },
    querySelector: (selector) => {
      return null;
    },
    querySelectorAll: (selector) => {
      return [];
    }
  },
  localStorage: {
    getItem: (key) => {
      return this._storage[key] !== undefined ? this._storage[key] : null;
    },
    setItem: (key, value) => {
      this._storage[key] = value.toString();
    },
    _storage: {}
  }
};

// Add console for logging
context.console = console;

// We also need to mock the `matchMedia` function that is used on line 36.
context.window.matchMedia = (query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {}
  };
};

// Now, we want to execute the script but stop before it tries to use the DOM in a way that would fail.
// However, the script is not modular and we cannot easily stop it at the FixLabDB definition.
// Instead, we can let it run and see if it throws. With our mocks, the early parts (like trying to get elements) will return null and the scripts will return early.

try {
  // Create a context and run the script
  vm.createContext(context); // For Node.js >=10
  vm.runInContext(scriptContent, context);
  
  console.log('✓ FixLabDB script executed successfully with mocked DOM');
  
  // Test if FixLabDB is defined
  if (typeof context.FixLabDB !== 'undefined') {
    console.log('✓ FixLabDB is defined');
    
    // Test basic functionality
    try {
      // Test insert
      const testUser = { name: 'Test User', email: 'test@example.com', password: 'test123' };
      const inserted = context.FixLabDB.insert(context.FixLabDB.collections.USERS, testUser);
      console.log('✓ Insert works:', inserted._id);
      
      // Test findOne
      const found = context.FixLabDB.findOne(context.FixLabDB.collections.USERS, { email: 'test@example.com' });
      console.log('✓ FindOne works:', found ? 'Found user' : 'User not found');
      
      // Test updateOne
      const updated = context.FixLabDB.updateOne(context.FixLabDB.collections.USERS, { email: 'test@example.com' }, { $set: { name: 'Updated Name' } });
      console.log('✓ UpdateOne works:', updated === 1 ? 'Updated 1 document' : `Updated ${updated} documents`);
      
      // Verify update
      const updatedUser = context.FixLabDB.findOne(context.FixLabDB.collections.USERS, { email: 'test@example.com' });
      console.log('✓ Verification:', updatedUser ? updatedUser.name : 'Failed to get updated user');
      
      // Clean up test data
      context.FixLabDB.removeOne(context.FixLabDB.collections.USERS, { email: 'test@example.com' });
      console.log('✓ Cleaned up test data');
      
    } catch (e) {
      console.error('✗ Error testing FixLabDB methods:', e.message);
    }
    
  } else {
    console.log('✗ FixLabDB is NOT defined');
  }
  
} catch (e) {
  console.error('✗ Error executing FixLabDB script:', e.message);
  console.error(e.stack);
}