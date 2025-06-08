
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeLanguage } from './CodingPlayground';

interface CodeTemplate {
  name: string;
  description: string;
  code: string;
}

const templates: Record<CodeLanguage, CodeTemplate[]> = {
  web: [],
  python: [
    {
      name: "Hello World",
      description: "Basic print statement",
      code: `print("Hello, World!")`
    },
    {
      name: "User Input",
      description: "Get input from user",
      code: `name = input("Enter your name: ")
print(f"Hello, {name}!")`
    },
    {
      name: "Simple Calculator",
      description: "Basic arithmetic operations",
      code: `def calculator():
    num1 = float(input("Enter first number: "))
    operator = input("Enter operator (+, -, *, /): ")
    num2 = float(input("Enter second number: "))
    
    if operator == '+':
        result = num1 + num2
    elif operator == '-':
        result = num1 - num2
    elif operator == '*':
        result = num1 * num2
    elif operator == '/':
        if num2 != 0:
            result = num1 / num2
        else:
            print("Error: Division by zero!")
            return
    else:
        print("Invalid operator!")
        return
    
    print(f"Result: {result}")

calculator()`
    }
  ],
  java: [
    {
      name: "Hello World",
      description: "Basic Java program",
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`
    },
    {
      name: "User Input",
      description: "Read user input",
      code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter your name: ");
        String name = scanner.nextLine();
        System.out.println("Hello, " + name + "!");
        scanner.close();
    }
}`
    }
  ],
  c: [
    {
      name: "Hello World",
      description: "Basic C program",
      code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`
    },
    {
      name: "User Input",
      description: "Read user input",
      code: `#include <stdio.h>

int main() {
    char name[100];
    printf("Enter your name: ");
    scanf("%s", name);
    printf("Hello, %s!\\n", name);
    return 0;
}`
    }
  ],
  cpp: [
    {
      name: "Hello World",
      description: "Basic C++ program",
      code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`
    },
    {
      name: "User Input",
      description: "Read user input",
      code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    cout << "Enter your name: ";
    getline(cin, name);
    cout << "Hello, " << name << "!" << endl;
    return 0;
}`
    }
  ],
  sql: [
    {
      name: "Select Query",
      description: "Basic SELECT statement",
      code: `SELECT * FROM users WHERE age > 18;`
    },
    {
      name: "Create Table",
      description: "Create a new table",
      code: `CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    age INT
);`
    },
    {
      name: "Insert Data",
      description: "Insert new records",
      code: `INSERT INTO students (id, name, email, age) 
VALUES 
    (1, 'John Doe', 'john@example.com', 20),
    (2, 'Jane Smith', 'jane@example.com', 22);`
    }
  ]
};

interface CodeTemplatesProps {
  language: CodeLanguage;
  onTemplateSelect: (code: string) => void;
}

export const CodeTemplates = ({ language, onTemplateSelect }: CodeTemplatesProps) => {
  const languageTemplates = templates[language] || [];

  if (languageTemplates.length === 0) {
    return null;
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">Code Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {languageTemplates.map((template, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-3 flex flex-col items-start text-left"
              onClick={() => onTemplateSelect(template.code)}
            >
              <div className="font-medium">{template.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {template.description}
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
