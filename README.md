# BetterMap

## 1. Project Description
This browser based web application to make a better map for BCIT Burnaby Campus. It has a complete color-coded map of the BBY Campus and accurate user location so you can see where you are.
It has the building blocks for A* Pathfinding within campus through a multi-dimension list and a PFnode class.

## 2. Names of Contributors 
* Hi, Im Alex im excited about this because I constantly think would have been nice to have this already when navigating around.
* Corey Buchan - 5 years of QA experience, strongly desires to automate everything in his life.
* Hi, my name is Chun Ki! First Term CST Student at BCIT.
	
## 3. Technologies and Resources Used
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* Google Material Symbols
* Javascript
* HTML/CSS

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* Clone this repository
* If using VSCode:
    * File > Open Workspace from File...
    * Select the 1800_202410_BBY17.code-workspace
    * This will show you the recommended extensions and set up the formatter to the same one we used.
* If **not** using VSCode:
    * Open the workspace in your favorite IDE.

## 5. Known Bugs and Limitations
Here are some known bugs:
* Map SVG currently not showing on iOS device
* Snap to User Location current not working as expected.
* ...

## 6. Features for Future
What we'd like to build in the future:
* The ability to view the interior layouts of buildings; SE12_2 and SW5 are complete.
* Dynamic pathfinding based on user location
* Show the direction that a user is facing.
* Calculate ETA based on path distance.
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder:
├── .firebaserc              # Stores the settings for deploying to firebase.
├── .gitignore               # Git ignore file
├── .gitattributes           # Git attributes file, helps with highlighting/contribution counts
├── 1800_202410_BBY17.code-wordspace #VSCode workspace to standardize extensions and formatting
├── 404.html                 # Page for handling if the user encounters a 404 error.
├── index.html               # landing HTML file, this is what users see when they open the site
├── login.html               # Login page, handles authenticating the user via Firebase.
├── main.html                # The meat and bones of the site.
├── firebase.json            # Firebase ignore settings.
├── package.json             # Node dependencies; created by Firebase.
├── package-lock.json        # Node modules; created by Firebase.
└── README.md

It has the following subfolders and files:
├── images/                  # Folder for images
    BCITMap.ai               # Illustrator file that we use to update the BCITMap
    BCITMap_PreMask.ai       # Illustrator file from before we applied the walking area mask. Retained in case we need to revert to this point for some reason.
    BCITMap.psd              # The PSD file used to stitch together the old map from Google Maps screenshots
    Original.png             # A screenshot of the prototype map. Used so we can see how far we've come :')
    └── map/                 # Folder to hold the map and any other map-related filed
        BCITMap.svg          # The SVG we load to display the BCIT map
├── scripts/                 # Folder for scripts
    /authentication.js       # Handles authentication of the user in Firebase
    /firebaseAPI_BBY17.js    # Contains the settings for setting up the FirebaseApp
    /header.js               # Logic for what to show/hide on the header
    /main.js                 # Entrypoint for all the various modules used to run the functionality of main.html
    /script.js               # Scripts that can be used on any page; currently just used to handle logging the user out.
    /skeleton.js             # Loads the standard header and footer of each page
    /writeToFirebase.js      # Quickly loads data into the connect FireStore
    └── modules/             # Holds the modules we use to create sharable functions
        classes.js           # Currently just holds a single class; used to ensure functions involving an x/y coordinate on the screen had a standard x/y accessor
        location.js          # Handles the tracking of user location and converting Geolocation to a % of the map area, or a x/y coordinate on the screen.
        logging.js           # Helps standardize the logging for pointer events, since we did so much of it.
        map.js               # Handles the initializing and manipulating of the map.
        pfNode.js            # Runs the A* Pathfinding
        search.js            # Runs the search bar and all related connections to the FireStore.
├── styles/                  # Folder for styles
    style.css                # Standard website stylesheet.
└── text/                    # Holds the raw text files we use.
    footer.html              # The standard footer; loaded by skeleton.js
    header.html              # The standard header; loaded by skeleton.js
    skeleton.html            # A blank default page; useful for create new pages.

```


