use organization;

INSERT INTO department (name)
VALUES
    ('Marketing'),
    ('Recruiting'),
    ('Field Service'),
    ('Project Management'),
    ('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Marketing Associate', 30000, 1),
    ('Sales Associate', 20000, 1),
    ('Technical Recruiter', 35000, 2),
    ('Jr. Recruiter', 20000, 2),
    ('Installer Tier 1', 40000, 3),
    ('Installer Tier 2', 50000, 3),
    ('Project Coordinator', 35000, 4),
    ('Project Lead', 50000, 4),
    ('Jr. Accountant', 30000, 5),
    ('Lead Accountant', 60000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Davey','Crockett', 1, NULL),
    ('Georgie','Porgie', 1, NULL),
    ('Paul','Bunyan', 2, NULL),
    ('Johnny','Appleseed', 2, NULL),
    ('Lil-miss','Muppet', 3, NULL),
    ('Humpty', 'Dumpty', 3, NULL),
    ('Tweedle', 'Dumm', 4, NULL),
    ('Tweedle', 'Dee', 4, NULL),
    ('Mother', 'Goose', 5, NULL),
    ('Jack', 'Sprat', 5, NULL);
    


