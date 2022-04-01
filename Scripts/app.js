/* custom JavaScript goes here */

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function
//Closure - limits scope leak

"use strict";

((core) =>
{
    /**
     * Inject the Navigation bar into the Header element and highlight the active link based on the pageName parameter
     *
     * @param {string} pageName
     */
    function loadHeader(pageName)
    {
      // inject the Header
      $.get("./Views/components/header.html", function(data)
      {
        $("header").html(data); // load the navigation bar

        toggleLogin(); // add login / logout and secure links

        $(`#${pageName}`).addClass("active"); // highlight active link

        // loop through each anchor tag in the unordered list and 
        // add an event listener / handler to allow for 
        // content injection
        $("a").on("click", function()
        { 
          $(`#${router.ActiveLink}`).removeClass("active"); // removes highlighted link
          router.ActiveLink = $(this).attr("id");
          loadContent(router.ActiveLink, ActiveLinkCallBack(router.ActiveLink));
          $(`#${router.ActiveLink}`).addClass("active"); // applies highlighted link to new page
          history.pushState({},"", router.ActiveLink); // this replaces the url displayed in the browser
        });

        // make it look like each nav item is an active link
        $("a").on("mouseover", function()
        {
          $(this).css('cursor', 'pointer');
        });
      });
    }

    function AddLinkEvents(link) {
        let linkQuery = $(`a.link[data=${link}]`);
        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");
        linkQuery.css("text-decoration", "underline");
        linkQuery.css("color", "blue");
        linkQuery.on("click", function () {
            LoadLink(`${link}`);
        });
        linkQuery.on("mouseover", function () {
            $(this).css("cursor", "pointer");
            $(this).css("font-weight", "bold");
        });
        linkQuery.on("mouseout", function () {
            $(this).css("font-weight", "normal");
        });
    }

    /**
     * Inject page content in the main element 
     *
     * @param {string} pageName
     * @param {function} callback
     * @returns {void}
     */
    function loadContent(pageName, callback)
    {
      // inject content
      $.get(`./Views/content/${pageName}.html`, function(data)
      {
        $("main").html(data);

        callback();
      });
      
    }

    function loadFooter()
    {
      // inject the Footer
      $.get("./Views/components/footer.html", function(data)
      {
        $("footer").html(data);
      });
    }

    function DisplayHome()
    {
        // Name of button and id are same... this is a naming convention. Button is actually an 'html element'
        console.log("Home Page");
        
        
        //Displayed content
        let AboutUsButton = document.getElementById("AboutUsButton");
        AboutUsButton.addEventListener("click", function()
        {
            location.href = "/about.html";
        });

        // Step 1 - get a reference to an entry point
        let MainDivContainer = document.getElementsByTagName("main")[0];  
        let MainDivHeading = document.getElementsByTagName("h1")[0];
        let HeroImage = document.getElementById("CodeHeroImage");

        // Step 2 - create an html element in memory
        let HeroParagraph = document.createElement("p");

        // Step 3 - configure new element
        MainDivContainer.setAttribute("id","MainDivContainer");
        MainDivHeading.setAttribute("id", "MainDivHeading;");
        HeroParagraph.setAttribute("id", "HeroParagraph");
        HeroParagraph.setAttribute("class", "mt-3");
        HeroParagraph.innerHTML = `This is the landing page for a website in development as part of a ongoing for the course WEBD6201.\nThe creators of this site include Katherine Bellman and Russell Waring, who both both enrolled in\n the Computer Programming and Analysis Program at Durham College. \n We were moulded into developers who put our clients needs first.\n Check out out software development services to get a taste of what we can do for you!\n`;


        // Step 4 - perform insertion
        HeroImage.after(HeroParagraph);
    }

    function DisplayAbout()
    {

       console.log("About Page");

        let Header_About_Header = "About Us";    
        let About_Cards_Data = [
            {
                Name: "Russell Waring",
                Github: "https://github.com/RussellWaring",
                blurb:"Greetings. I am a student of Durham College in Oshawa studying Computer Programming and Analysis. I have an Urban Forestry Technician Degree and broad working experience in many fields. Although I grew up in a small town, I have big dreams!",
                resume_link: "https://www.linkedin.com/in/russell-waring/",
            },
            {
                Name: "Katherine Bellman",
                Github: "https://github.com/Tsukiyomi-Inari",
                blurb: "I am Katherine Bellman, studying Computer Programming and Analysis at Durham College in Oshawa. As an Alumni of OCAD University, I apply creative solutions to computational problems and design attractive user interfaces through colour theory practices.",
                resume_link: "https://dconline-my.sharepoint.com/:b:/g/personal/katherine_bellman_dcmail_ca/EcraWZsK4R5Bo2UXGh91c8MBl_12pDZ66gjbi2QhUquLtg?e=KcHZhB", 
            },
        ];

        //Insert the title text
        let titleH1 = document.getElementsByTagName("h1")[0];
        titleH1.innerHTML = Header_About_Header;  

        document.getElementsByClassName("card-title")[0].innerHTML = About_Cards_Data[0].Name;
        //document.getElementsByClassName("card-github")[0].innerHTML = About_Cards_Data[0].Github;
        document.getElementsByClassName("card-text")[0].innerHTML = About_Cards_Data[0].blurb;
        let russell_resume = document.getElementsByClassName("card-button")[0]; 
        russell_resume.setAttribute("href", About_Cards_Data[0].resume_link);
        russell_resume.textContent = "Resume";

        console.log(russell_resume.getAttribute("href"));

        // Waring resume link
        let russell_button = document.getElementsByClassName("btn")[0];
        russell_button.addEventListener("click", function()
        {
            location.href = russell_resume.getAttribute("href");
        });

        document.getElementsByClassName("card-title")[1].innerHTML = About_Cards_Data[1].Name;
        //document.getElementsByClassName("card-github")[1].innerHTML = About_Cards_Data[1].Github;
        document.getElementsByClassName("card-text")[1].innerHTML = About_Cards_Data[1].blurb;
        let bellman_resume = document.getElementsByClassName("card-button")[1]; 
        bellman_resume.setAttribute("href", About_Cards_Data[0].resume_link);
        bellman_resume.textContent = "Resume";

        console.log(bellman_resume.getAttribute("href"));

        // Bellman resume link
        let bellman_button = document.getElementsByClassName("btn")[1];
        bellman_button.addEventListener("click", function()
        {
            location.href = bellman_resume.getAttribute("href");
        });

    }

    function DisplayProjects()
    {
        console.log("Projects Page");

        let MainDivHeading = document.getElementsByTagName("h1")[0];
        MainDivHeading.textContent = "Our Projects";
        //console.log(MainDivHeading);

        // Step 2 - create html element
        let h6KB = document.getElementsByTagName("h6")[0];
        let paraKB = document.getElementsByTagName("p")[0];

        let h6RW = document.getElementsByTagName("h6")[1];
        let paraRW = document.getElementsByTagName("p")[1];

        let h6KB2 = document.getElementsByTagName("h6")[2];
        let paraKB2 = document.getElementsByTagName("p")[2];

        // Step 3 - configure elements
        h6KB.innerHTML = "K. Bellman";
        paraKB.innerHTML = "Cases By Region, NETD2202";

        h6RW.innerHTML = "R. Waring";
        paraRW.innerHTML = "In-class exercise 4, NETD2202";

        h6KB2.innerHTML = "K. Bellman";
        paraKB2.innerHTML = "Validation, NETD2202 final";
    }

    function DisplayServices()
    {
      console.log("Services Page");
        
        let Header_Kat_Services = "Katherine Specializes in: ";    
        let Kat_Services = [
            {
                Service: "Web Design",
                // text:"",
            },
            {
                Service: "Web Development",
                // text:"",
            },
            {
                Service: "UI Design",
                // text:"",
            },
        ];


        let Header_Russel_Services = "Russell Specializes in: ";    
        let Russel_Services = [
            {
                Service: "System Development",
                //text: "",
            },
            {
                Service: "C# .Net Core Frameworks Development",
                //text: "",
            },
            {
                Service: "Proofreading Code",
                //text: "",
            },
        ];

        // Insertion point class for each name=> service heading 
        let serviceHeaderKB = document.getElementsByClassName("service-heading")[0];
        serviceHeaderKB.innerHTML = Header_Kat_Services;
        
        let serviceHeaderRW = document.getElementsByClassName("service-heading")[1];
        serviceHeaderRW.innerHTML = Header_Russel_Services;  

        
        // Insertion point class for Name of service => service-note
        let serviceKB0 = document.getElementsByClassName("service-note")[0];
        let serviceKB1 = document.getElementsByClassName("service-note")[1];
        let serviceKB2 = document.getElementsByClassName("service-note")[2];
        serviceKB0.innerHTML = Kat_Services[0].Service;
        serviceKB1.innerHTML = Kat_Services[1].Service;
        serviceKB2.innerHTML = Kat_Services[2].Service;

        let serviceRW0 = document.getElementsByClassName("service-note")[3];
        let serviceRW1 = document.getElementsByClassName("service-note")[4];
        let serviceRW2 = document.getElementsByClassName("service-note")[5];
        serviceRW0.innerHTML = Russel_Services[0].Service;
        serviceRW1.innerHTML = Russel_Services[1].Service;
        serviceRW2.innerHTML = Russel_Services[2].Service;
    }

    function testFullName()
    {
      let messageArea = $("#messageArea").hide();
      let fullNamePattern = /([A-Z][a-z]{1,25})+(\s|,|-)([A-Z][a-z]{1,25})+(\s|,|-)*/;

        
        $("#fullName").on("blur", function()
        {
          if(!fullNamePattern.test($(this).val()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Full Name. This must include at least a Capitalized first name followed by a Capitlalized last name.");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function testContactNumber()
    {
      let messageArea = $("#messageArea");
      let contactNumberPattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        
        $("#contactNumber").on("blur", function()
        {
          if(!contactNumberPattern.test($(this).val()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Contact Number. Country code and area code are both optional");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function testEmailAddress()
    {
      let messageArea = $("#messageArea");
      let emailAddressPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
        
        $("#emailAddress").on("blur", function()
        {
          if(!emailAddressPattern.test($(this).val()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Email Address.");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function formValidation()
    {
      testFullName();
      testContactNumber();
      testEmailAddress();
    }

    function DisplayContact()
    {
      // form validation
      formValidation();

        $("#sendButton").on("click", (event)=> 
        {
          if($("#subscribeCheckbox")[0].checked)
          {
            let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);

            if(contact.serialize())
            {
              let key = contact.FullName.substring(0, 1) + Date.now();

              localStorage.setItem(key, contact.serialize());
            }
          }
        });
    }

    function DisplayContactList() 
    {
      // don't allow visitors to go here
      authGuard();

      if (localStorage.length > 0) 
      {

        let contactList = document.getElementById("contactList");

        let data = "";

        let keys = Object.keys(localStorage);
         
        let index = 1;

        for (const key of keys) 
        {
          let contactData = localStorage.getItem(key);

          let contact = new core.Contact();
          contact.deserialize(contactData);

          data += `<tr>
          <th scope="row" class="text-center">${index}</th>
          <td>${contact.FullName}</td>
          <td>${contact.ContactNumber}</td>
          <td>${contact.EmailAddress}</td>
          <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
          <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
          </tr>`;

          index++;
        }

        contactList.innerHTML = data;

        
        $("button.delete").on("click", function(){
          if(confirm("Are you sure?"))
          {
            localStorage.removeItem($(this).val());
          }
          location.href = "/contact-list"; // refresh the page
        });
        
        $("button.edit").on("click", function(){
          location.href = "/edit#" + $(this).val();
         });

        }
      $("#addButton").on("click", function() 
      {
        location.href = "/edit";
      });
    }

    function DisplayEdit()
    {
      let key = location.hash.substring(1);

      let contact = new core.Contact();

      // check to ensure that the key is not empty
      if(key != "")
      {
        // get contact info from localStorage
        contact.deserialize(localStorage.getItem(key));

        // display contact information in the form
        $("#fullName").val(contact.FullName);
        $("#contactNumber").val(contact.ContactNumber);
        $("#emailAddress").val(contact.EmailAddress);
      }
      else
      {
        // modify the page so that it shows "Add Contact" in the header 
        $("main>h1").text("Add Contact");
        // modify edit button so that it shows "Add" as well as the appropriate icon
        $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);
      }

      // form validation
      formValidation();
      
     $("#editButton").on("click", function() 
        {
            // check to see if key is empty
          if(key == "")
          {
            // create a new key
            key = contact.FullName.substring(0, 1) + Date.now();
          }

          // copy contact info from form to contact object
          contact.FullName = $("#fullName").val();
          contact.ContactNumber = $("#contactNumber").val();
          contact.EmailAddress = $("#emailAddress").val();

          // add the contact info to localStorage
          localStorage.setItem(key, contact.serialize());

          // return to the contact list
          location.href = "/contact-list";
          
        });

      $("#cancelButton").on("click", function()
      {
        // return to the contact list
        location.href = "/contact-list";
      });
    }

    /**
     * Processes the Login and performs validation
     */
    function performLogin()
    {
      let messageArea = $("#messageArea");
      messageArea.hide();

      let username = $("#username");
      let password = $("#password");
      let success = false;
      let newUser = new core.User();

      // use ajax to access the json file
      $.get("./Data/users.json", function(data)
      {
        // check each user in the users.json file  (linear search)
        for (const user of data.users) 
        {
          if(username.val() == user.Username && password.val() == user.Password)
          {
            newUser.fromJSON(user);
            success = true;
            break;
          }
        }

        // if username and password matches - success... then perform login
        if(success)
        {
          // add user to session storage
          sessionStorage.setItem("user", newUser.serialize());

          // hide any error message
          messageArea.removeAttr("class").hide();

          // redirect user to secure area - contact-list
          
          location.href = "/contact-list";
        }
        else
        {
          // display an error message
          username.trigger("focus").trigger("select");
          messageArea.show().addClass("alert alert-danger").text("Error: Invalid login information");
        }
      });
    }

    /**
     * Displays and Processes the Login page
     */
    function DisplayLogin()
    {
      AddLinkEvents("register");

      $("#loginButton").on("click", function() 
      {
        performLogin();
      });

      $("#password").on("keypress", function(event)
      {
        if(event.key == "Enter")
        {
          performLogin();
        }
        });

      $("#cancelButton").on("click", function()
      {
        // clear the login form
        document.forms[0].reset();
        // return to the home page
        location.href = "/home";
      });
    }

    function DisplayRegister()
    {
        AddLinkEvents("login");
    }

    function toggleLogin()
    {
      // if user is logged in
      if(sessionStorage.getItem("user"))
      {
        // swap out the login link for logout
        $("#loginListItem").html(
        `<a id="logout" class="nav-link" aria-current="page"><i class="fas fa-sign-out-alt"></i> Logout</a>`
        );

        $("#logout").on("click", function()
        {
          // perform logout
          sessionStorage.clear();

          // redirect back to login
          location.href = "/login";
        });

        // make it look like each nav item is an active link
        $("#logout").on("mouseover", function()
        {
          $(this).css('cursor', 'pointer');
        });

        $("#tasklist").on("mouseover", function()
        {
          $(this).css('cursor', 'pointer');
        });
     
            $(`<li class="nav-item">
            <a id="contact-list" class="nav-link" aria-current="page"><i class="fas fa-users fa-lg"></i> Contact List</a>
          </li>`).insertBefore("#loginListItem");

            $(`<li class="nav-item">
            <a id="tasklist" class="nav-link" aria-current="page"><i class="fas fa-list"></i> Task List</a>
          </li>`).insertBefore("#loginListItem");

      }
      else
      {
        // swap out the login link for logout
        $("#loginListItem").html(
          `<a id="login" class="nav-link" aria-current="page"><i class="fas fa-sign-in-alt"></i> Login</a>`
          );
      }
    }

    function authGuard()
    {
      if(!sessionStorage.getItem("user"))
      {
      // redirect back to login page
      location.href = "/login";
      }
    }

    function Display404()
    {
     /*    $("#Return_home").on("click", () => 
        {
          location.href = "/home";
        }); */
    }

    function ActiveLinkCallBack(activeLink)
    {
      switch (activeLink) 
      {
        case "home": return DisplayHome;
        case "about": return DisplayAbout;
        case "projects": return DisplayProjects;
        case "services": return DisplayServices;
        case "contact": return DisplayContact;
        case "contact-list": return DisplayContactList;
        case "edit": return DisplayEdit;
        case "login": return DisplayLogin;
        case "register": return DisplayRegister;
        case "tasklist": return DisplayTaskList;
        case "404": return Display404;
        case "/" : return DisplayHome;
        default:
          console.error("ERROR: callback does not exist: " + activeLink);
          break;
      }
    }

    /**
     * This function adds a new Task to the TaskList
     */
    function AddNewTask() 
    {
      let messageArea = $("#messageArea");
      messageArea.hide();
      let taskInput = $("#taskTextInput");

      if (taskInput.val() != "" && taskInput.val().charAt(0) != " ") 
      {
        let newElement = `
              <li class="list-group-item" id="task">
              <span id="taskText">${taskInput.val()}</span>
              <span class="float-end">
                  <button class="btn btn-outline-primary btn-sm editButton"><i class="fas fa-edit"></i>
                  <button class="btn btn-outline-danger btn-sm deleteButton"><i class="fas fa-trash-alt"></i></button>
              </span>
              <input type="text" class="form-control edit-task editTextInput">
              </li>
              `;
        $("#taskList").append(newElement);
        messageArea.removeAttr("class").hide();
        taskInput.val("");
      } 
      else 
      {
        taskInput.trigger("focus").trigger("select");
        messageArea.show().addClass("alert alert-danger").text("Please enter a valid Task.");
      }
    }

    /**
     * This function is the Callback function for the TaskList
     *
     */
    function DisplayTaskList()
    {
        authGuard();

        console.log("Task list page")

        let messageArea = $("#messageArea");
        messageArea.hide();
        let taskInput = $("#taskTextInput");

        // add a new Task to the Task List
        $("#newTaskButton").on("click", function()
        {         
            AddNewTask();
        });

        taskInput.on("keypress", function(event)
        {
          if(event.key == "Enter")
          {
            AddNewTask();
          }
         });

        // Edit an Item in the Task List
        $("ul").on("click", ".editButton", function(){
           let editText = $(this).parent().parent().children(".editTextInput");
           let text = $(this).parent().parent().text();
           editText.val(text).show().trigger("select");
           editText.on("keypress", function(event)
           {
            if(event.key == "Enter")
            {
              if(editText.val() != "" && editText.val().charAt(0) != " ")
              {
                editText.hide();
                $(this).parent().children("#taskText").text(editText.val());
                messageArea.removeAttr("class").hide();
              }
              else
              {
                editText.trigger("focus").trigger("select");
                messageArea.show().addClass("alert alert-danger").text("Please enter a valid Task.");
              }
            }
           });
        });

        // Delete a Task from the Task List
        $("ul").on("click", ".deleteButton", function(){
            if(confirm("Are you sure?"))
            {
                $(this).closest("li").remove();
            }    
        });
    }

    function Start()
    {
        console.log("App Started...");

        loadHeader(router.ActiveLink);
      
        loadContent(router.ActiveLink, ActiveLinkCallBack(router.ActiveLink));

        loadFooter();
    }

    window.addEventListener("load", Start);

  core.Start = Start;

})(core || (core={}));