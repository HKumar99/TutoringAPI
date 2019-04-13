
# Students Help Students

---

Name: Harish Kumar

Date: April 12, 2019

Project Topic: Student Tutor Volunteers

URL: 

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`:     Name       `Type: String`
- `Field 2`:     Email      `Type: String`
- `Field 3`:     GPA       `Type: Number`
- `Field 4`:     Major       `Type: String`
- `Field 5`:     Courses     `Type: String Array`
- `Field 6`:     Year      `Type: Number`

Schema: 
```javascript
{
   name: String,
   email: String,
   gpa: Number,
   major: String,
   courses: [String],
   year: Number
}
```

### 2. Add New Data

HTML form route: `/addStudent`

POST endpoint route: `/api/create`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/create',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
       "name":"Tony Stark",
       "email": "tony@stark.org",
       "gpa": 4.0,
       "major": "Badassery",
       "courses": ["JARV100, AVEN400"],
       "year": 2019
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api`

### 4. Search Data

Search Field: name

### 5. Navigation Pages

Navigation Filters
1. Talented Tutors -> `  /api/talented  `
2. Bad GPA -> `  /api/math  `
3. Good GPA -> `  /api/goodgpa  `
4. Tutors for CMSC330 -> ` /api/cmsc330  `
5. Upperclassmen Tutors -> ` /api/upper `

