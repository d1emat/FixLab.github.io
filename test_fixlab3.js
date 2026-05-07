// Test script to verify FixLabDB is working by mocking the required globals correctly

const fs = require('fs');
const vm = require('vm');

// Read the script.js file
let scriptContent = fs.readFileSync('C:/Users/dmateo/Downloads/FixLab Web-20260429T063734Z-3-001/script.js', 'utf8');

// Create a mock storage for localStorage
const storage = {};

// Create the context
const context = {
  window: {},
  // Mock document to return null for all IDs (so early returns happen)
  document: {
    getElementById: (id) => null,
    querySelector: (selector) => null,
    querySelectorAll: (selector) => []
  },
  localStorage: {
    getItem: (key) => storage[key] || null,
    setItem: (key, value) => { storage[key] = value.toString(); }
  }
};

// Add console for logging
context.console = console;

// Mock matchMedia
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

// Now run the script
try {
  vm.createContext(context);
  vm.runInContext(scriptContent, context);
  
  console.log('✓ FixLabDB script executed successfully');
  
  // Check if FixLabDB is defined
  if (typeof context.FixLabDB !== 'undefined') {
    console.log('✓ FixLabDB is defined');
    
    // Test the methods
    try {
      // Insert a test user
      const testUser = { name: 'Test User', email: 'test@example.com', password: 'test123' };
      const inserted = context.FixLabDB.insert(context.FixLabDB.collections.USERS, testUser);
      console.log('✓ Insert works: ID =', inserted._id);
      
      // Find the user
      const found = context.FixLabDB.findOne(context.FixLabDB.collections.USERS, { email: 'test@example.com' });
      console.log('✓ FindOne works:', found ? 'User found' : 'User not found');
      
      // Update the user
      const updateResult = context.FixLabDB.updateOne(context.FixLabDB.collections.USERS, { email: 'test@example.com' }, { $set: { name: 'Updated Name' } });
      console.log('✓ UpdateOne works:', updateResult === 1 ? 'Updated 1 document' : `Updated ${updateResult} documents`);
      
      // Verify the update
      const updatedUser = context.FixLabDB.findOne(context.FixLabDB.collections.USERS, { email: 'test@example.com' });
      console.log('✓ Verification:', updatedUser ? updatedUser.name : 'Failed to get updated user');
      
      // Clean up
      const removed = context.FixLabDB.removeOne(context.FixLabDB.collections.USERS, { email: 'test@example.com' });
      console.log('✓ Cleanup: Removed', removed, 'document');
      
    } catch (e) {
      console.error('✗ Error testing FixLabDB methods:', e.message);
      console.error(e.stack);
    }
    
  } else {
    console.log('✗ FixLabDB is NOT defined');
  }
  
} catch (e) {
  console.error('✗ Error executing FixLabDB script:', e.message);
  console.error(e.stack);
}