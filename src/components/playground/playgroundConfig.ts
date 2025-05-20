
import { CodeLanguage } from './CodingPlayground';

// Default code templates for each language
export const languageOptions = [
  {
    id: 'web',
    name: 'HTML/CSS/JS',
    defaultCode: '',
  },
  {
    id: 'python',
    name: 'Python',
    defaultCode: `# Python Example
def greet(name):
    return f"Hello, {name}!"

# Main program
if __name__ == "__main__":
    user_name = input("Enter your name: ")
    message = greet(user_name)
    print(message)
    print("Welcome to SGK14 Python playground!")
`,
  },
  {
    id: 'java',
    name: 'Java',
    defaultCode: `// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, SGK14!");
        
        // Variables and data types
        String name = "Student";
        int age = 15;
        
        // Print a message
        System.out.println("Welcome " + name + "! You are " + age + " years old.");
    }
}`,
  },
  {
    id: 'c',
    name: 'C',
    defaultCode: `// C Example
#include <stdio.h>

int main() {
    printf("Hello, SGK14!\\n");
    
    // Variables
    char name[] = "Student";
    int age = 15;
    
    // Print a message
    printf("Welcome %s! You are %d years old.\\n", name, age);
    
    return 0;
}`,
  },
  {
    id: 'cpp',
    name: 'C++',
    defaultCode: `// C++ Example
#include <iostream>
#include <string>
using namespace std;

int main() {
    cout << "Hello, SGK14!" << endl;
    
    // Variables
    string name = "Student";
    int age = 15;
    
    // Print a message
    cout << "Welcome " << name << "! You are " << age << " years old." << endl;
    
    return 0;
}`,
  },
  {
    id: 'sql',
    name: 'SQL',
    defaultCode: `-- SQL Example
-- Create a table
CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  grade INTEGER,
  subject TEXT
);

-- Insert some data
INSERT INTO students (id, name, grade, subject)
VALUES (1, 'John', 9, 'Math'),
       (2, 'Emma', 10, 'Science'),
       (3, 'Michael', 8, 'History');

-- Query the data
SELECT * FROM students WHERE grade > 8;`,
  },
];

// Default files for web development
export const defaultFiles = {
  '/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Coding Project</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Hello, SGK14 Coder!</h1>
    <p>Welcome to your coding playground. Edit any file and see results instantly!</p>
    <div class="card" id="card">
      <h2>Try these:</h2>
      <ul>
        <li>Change the text on this page</li>
        <li>Modify the CSS styles</li>
        <li>Add some JavaScript interactions</li>
      </ul>
      <button id="colorButton">Change Colors</button>
    </div>
  </div>
  <script src="index.js"></script>
</body>
</html>`,

  '/styles.css': `body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 20px;
  background-color: #f5f8ff;
  color: #333;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #2563eb;
  text-align: center;
}

p {
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
}

.card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

h2 {
  color: #4f46e5;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 10px;
}

ul {
  padding-left: 25px;
}

li {
  margin-bottom: 10px;
  position: relative;
}

button {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: block;
  margin: 20px auto 0;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1d4ed8;
}`,

  '/index.js': `// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  console.log('Page loaded and ready!');
  
  // Get references to elements
  const heading = document.querySelector('h1');
  const paragraph = document.querySelector('p');
  const card = document.getElementById('card');
  const colorButton = document.getElementById('colorButton');
  
  // Add click event to the button
  colorButton.addEventListener('click', function() {
    // Change background color with a random color
    const randomColor = getRandomColor();
    card.style.backgroundColor = randomColor;
    
    // Change text based on color brightness
    const brightness = calculateBrightness(randomColor);
    if (brightness < 128) {
      card.style.color = 'white';
    } else {
      card.style.color = '#333';
    }
  });
  
  // Function to generate a random color
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  // Function to calculate brightness of a color
  function calculateBrightness(color) {
    // Remove # if present
    color = color.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    
    // Calculate brightness using a common formula
    return (r * 299 + g * 587 + b * 114) / 1000;
  }
});`
};
