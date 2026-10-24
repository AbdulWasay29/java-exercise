INSERT INTO Employee (ID, Title, First_Name, Last_Name, Phone, Email)
VALUES (1, 'Mr.', 'Sloppy', 'Smith', '(555)555-5551', 'sloppy@example.com');
INSERT INTO Employee (ID, Title, First_Name, Last_Name, Phone, Email)
VALUES (2, 'Ms.', 'Taylor', 'Jones', '(555)555-5552', 'taylor@example.com');
INSERT INTO Employee (ID, Title, First_Name, Last_Name, Phone, Email)
VALUES (3, 'Mr.', 'Jordan', 'Lee', '(555)555-5553', 'jordan@example.com');
INSERT INTO Employee (ID, Title, First_Name, Last_Name, Phone, Email)
VALUES (4, 'Ms.', 'Morgan', 'Reed', '(555)555-5554', 'morgan@example.com');
INSERT INTO Employee (ID, Title, First_Name, Last_Name, Phone, Email)
VALUES (5, 'Mr.', 'Casey', 'Brown', '(555)555-5555', 'casey@example.com');
INSERT INTO Employee (ID, Title, First_Name, Last_Name, Phone, Email)
VALUES (6, 'Mr.', 'Abdul', 'Wasay', '(555)555-5556', 'a_wasay@fanshaweonline.ca');
ALTER TABLE Employee ALTER COLUMN ID RESTART WITH 7;

INSERT INTO Expense_Category (ID, Description) VALUES ('BSM', 'Business Meetings');
INSERT INTO Expense_Category (ID, Description) VALUES ('ENT', 'Entertainment');
INSERT INTO Expense_Category (ID, Description) VALUES ('PARK', 'Parking');
INSERT INTO Expense_Category (ID, Description) VALUES ('LDG', 'Lodging');
INSERT INTO Expense_Category (ID, Description) VALUES ('TRAV', 'Travel');
INSERT INTO Expense_Category (ID, Description) VALUES ('MEAL', 'Meals');
INSERT INTO Expense_Category (ID, Description) VALUES ('TUI', 'Tuition');
INSERT INTO Expense_Category (ID, Description) VALUES ('MISC', 'Miscellaneous');
INSERT INTO Expense_Category (ID, Description) VALUES ('OTH', 'Other');

INSERT INTO Expense (Employee_ID, Category_ID, Description, Date, Amount)
VALUES (1, 'PARK', 'Parking for Convention', '2023-04-13', 19.99);
INSERT INTO Expense (Employee_ID, Category_ID, Description, Date, Amount)
VALUES (1, 'LDG', 'Hotel for Convention', '2023-04-15', 219.99);
INSERT INTO Expense (Employee_ID, Category_ID, Description, Date, Amount)
VALUES (1, 'MEAL', 'Food at Convention', '2023-04-13', 39.99);
INSERT INTO Expense (Employee_ID, Category_ID, Description, Date, Amount)
VALUES (2, 'TUI', 'Tuition for Cobol course', '2023-05-19', 29.99);
INSERT INTO Expense (Employee_ID, Category_ID, Description, Date, Amount)
VALUES (2, 'MISC', 'Bought widgets for the office', '2023-05-20', 19.99);
INSERT INTO Expense (Employee_ID, Category_ID, Description, Date, Amount)
VALUES (6, 'TRAV', 'Bus to Fanshawe', '2025-09-21', 50.00);
