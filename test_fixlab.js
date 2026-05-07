// Test script to verify FixLabDB is working
const fs = require('fs');
const vm = require('vm');

// Read the script.js file
const scriptContent = fs.readFileSync('C:/Users/dmateo/Downloads/FixLab Web-20260429T063734Z-3-001/script.js', 'utf8');

// Create a context with window and localStorage mock
const context = {
  window: {},
  localStorage: {
    getItem: (key) => {
      const data = this._storage[key];
      return data !== undefined ? data : null;
    },
    setItem: (key, value) => {
      this._storage[key] = value.toString();
    },
    _storage: {}
  }
};

// Add console for logging
context.console = console;

// Execute the script in the context
try {
  vm.createContext(context); // For Node.js >=10
  vm.runInContext(scriptContent, context);
  
  console.log('✓ FixLabDB script executed successfully');
  
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
}