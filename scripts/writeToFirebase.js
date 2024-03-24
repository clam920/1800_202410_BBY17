// write SE12 washrooms into firebase.
function writeSE12WC() {
  var washroomsRef = db.collection("washrooms");

  washroomsRef.add({
    code: "SE12_100A",
    name: "SE12 100A",
    building: "SE12",
    level: "1",
    details: "Male Washroom",
    lat: 0.00,
    lng: 0.00,  
  });
  washroomsRef.add({
    code: "SE12_100C",
    name: "SE12 100C",
    building: "SE12",
    level: "1",
    details: "Female Washroom",
    lat: 0.00,
    lng: 0.00,  
  });
  washroomsRef.add({
    code: "SE12_201R",
    name: "SE12 201R",
    building: "SE12",
    level: "2",
    details: "Male Washroom",
    lat: 0.00,
    lng: 0.00,  
  });
  washroomsRef.add({
    code: "SE12_201Q",
    name: "SE12 201Q",
    building: "SE12",
    level: "2",
    details: "Female Washroom",
    lat: 0.00,
    lng: 0.00,  
  });
  washroomsRef.add({
    code: "SE12_211",
    name: "SE12 211",
    building: "SE12",
    level: "2",
    details: "Female Washroom",
    lat: 0.00,
    lng: 0.00,  
  });
  washroomsRef.add({
    code: "SE12_212",
    name: "SE12 212",
    building: "SE12",
    level: "2",
    details: "Male Washroom",
    lat: 0.00,
    lng: 0.00,  
  });
  washroomsRef.add({
    code: "SE12_315",
    name: "SE12 315",
    building: "SE12",
    level: "3",
    details: "Male Washroom",
    lat: 0.00,
    lng: 0.00,  
  });
  washroomsRef.add({
    code: "SE12_314",
    name: "SE12 314",
    building: "SE12",
    level: "3",
    details: "Female Washroom",
    lat: 0.00,
    lng: 0.00,  
  });
  washroomsRef.add({
    code: "SE12_411",
    name: "SE12 411",
    building: "SE12",
    level: "4",
    details: "Male Washroom",
    lat: 0.00,
    lng: 0.00,  
  });
  washroomsRef.add({
    code: "SE12_408",
    name: "SE12 408",
    building: "SE12",
    level: "4",
    details: "Female Washroom",
    lat: 0.00,
    lng: 0.00,  
  });
}

// write SE12 classrooms into firebase.
function writeSE12Class() {

  var classroomsRef = db.collection("classrooms");

  // classroomsRef.add({
  //   code: "SE12_101Q",
  //   name: "SE12 101",
  //   building: "SE12",
  //   level: "1",
  //   details: "Class",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });
  // classroomsRef.add({
  //   code: "SE12_103",
  //   name: "SE12 103",
  //   building: "SE12",
  //   level: "1",
  //   details: "Lab-Media",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });
  // classroomsRef.add({
  //   code: "SE12_301",
  //   name: "SE12 301",
  //   building: "SE12",
  //   level: "3",
  //   details: "Class",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });
  // classroomsRef.add({
  //   code: "SE12_302",
  //   name: "SE12 302",
  //   building: "SE12",
  //   level: "3",
  //   details: "Class",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });
  // classroomsRef.add({
  //   code: "SE12_303",
  //   name: "SE12 303",
  //   building: "SE12",
  //   level: "3",
  //   details: "Lab-Computer",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });
  // classroomsRef.add({
  //   code: "SE12_306",
  //   name: "SE12 306",
  //   building: "SE12",
  //   level: "3",
  //   details: "Lab-Computer",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });
  // classroomsRef.add({
  //   code: "SE12_307",
  //   name: "SE12 307",
  //   building: "SE12",
  //   level: "3",
  //   details: "Class",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });
  // classroomsRef.add({
  //   code: "SE12_308",
  //   name: "SE12 308",
  //   building: "SE12",
  //   level: "3",
  //   details: "Lab-Computer",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });
  // classroomsRef.add({
  //   code: "SE12_309",
  //   name: "SE12 309",
  //   building: "SE12",
  //   level: "3",
  //   details: "Class",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });
  // classroomsRef.add({
  //   code: "SE12_310",
  //   name: "SE12 310",
  //   building: "SE12",
  //   level: "3",
  //   details: "Lab-Computer",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });
  // classroomsRef.add({
  //   code: "SE12_311",
  //   name: "SE12 311",
  //   building: "SE12",
  //   level: "3",
  //   details: "Lab-Computer",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });
  // classroomsRef.add({
  //   code: "SE12_312",
  //   name: "SE12 312",
  //   building: "SE12",
  //   level: "3",
  //   details: "Class",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });
  // classroomsRef.add({
  //   code: "SE12_313",
  //   name: "SE12 313",
  //   building: "SE12",
  //   level: "3",
  //   details: "Class",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });
  // classroomsRef.add({
  //   code: "SE12_318",
  //   name: "SE12 318",
  //   building: "SE12",
  //   level: "3",
  //   details: "Lab-Computer",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });
  // classroomsRef.add({
  //   code: "SE12_319",
  //   name: "SE12 319",
  //   building: "SE12",
  //   level: "3",
  //   details: "Lab-Computer",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });
  // classroomsRef.add({
  //   code: "SE12_320",
  //   name: "SE12 320",
  //   building: "SE12",
  //   level: "3",
  //   details: "Lab-Computer",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });
  // classroomsRef.add({
  //   code: "SE12_321",
  //   name: "SE12 321",
  //   building: "SE12",
  //   level: "3",
  //   details: "Lab-Computer",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });

  // classroomsRef.add({
  //   code: "SE12_322",
  //   name: "SE12 322",
  //   building: "SE12",
  //   level: "3",
  //   details: "Lab-Computer",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });
  // classroomsRef.add({
  //   code: "SE12_323",
  //   name: "SE12 323",
  //   building: "SE12",
  //   level: "3",
  //   details: "Lab-Computer",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });
  // classroomsRef.add({
  //   code: "SE12_324",
  //   name: "SE12 324",
  //   building: "SE12",
  //   level: "3",
  //   details: "Lab-Computer",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });
  // classroomsRef.add({
  //   code: "SE12_325",
  //   name: "SE12 325",
  //   building: "SE12",
  //   level: "3",
  //   details: "Lab-Computer",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });
  // classroomsRef.add({
  //   code: "SE12_326",
  //   name: "SE12 326",
  //   building: "SE12",
  //   level: "3",
  //   details: "Lab-Computer",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });
  // classroomsRef.add({
  //   code: "SE12_327",
  //   name: "SE12 327",
  //   building: "SE12",
  //   level: "3",
  //   details: "Lab-Computer",
  //   lat: 0.00,
  //   lng: 0.00,
  //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
  // });
  classroomsRef.add({
    code: "SE12_401",
    name: "SE12 401",
    building: "SE12",
    level: "4",
    details: "Lab-Life Science",
    lat: 0.00,
    lng: 0.00,
    last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });

  classroomsRef.add({
    code: "SE12_402",
    name: "SE12 402",
    building: "SE12",
    level: "4",
    details: "Lab-Life Science",
    lat: 0.00,
    lng: 0.00,
    last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });
  classroomsRef.add({
    code: "SE12_403",
    name: "SE12 403",
    building: "SE12",
    level: "4",
    details: "Lab-Life Science",
    lat: 0.00,
    lng: 0.00,
    last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });
  classroomsRef.add({
    code: "SE12_404",
    name: "SE12 404",
    building: "SE12",
    level: "4",
    details: "Lab-Life Science",
    lat: 0.00,
    lng: 0.00,
    last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });
  classroomsRef.add({
    code: "SE12_406",
    name: "SE12 406",
    building: "SE12",
    level: "4",
    details: "Lab-Life Science",
    lat: 0.00,
    lng: 0.00,
    last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });
  classroomsRef.add({
    code: "SE12_407",
    name: "SE12 407",
    building: "SE12",
    level: "4",
    details: "Lab-Life Science",
    lat: 0.00,
    lng: 0.00,
    last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });
  classroomsRef.add({
    code: "SE12_412",
    name: "SE12 412",
    building: "SE12",
    level: "4",
    details: "Lab-Life Science",
    lat: 0.00,
    lng: 0.00,
    last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });
  classroomsRef.add({
    code: "SE12_413",
    name: "SE12 413",
    building: "SE12",
    level: "4",
    details: "Lab-Life Science",
    lat: 0.00,
    lng: 0.00,
    last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });
  classroomsRef.add({
    code: "SE12_414",
    name: "SE12 414",
    building: "SE12",
    level: "4",
    details: "Lab-Life Science",
    lat: 0.00,
    lng: 0.00,
    last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });
  classroomsRef.add({
    code: "SE12_415",
    name: "SE12 415",
    building: "SE12",
    level: "4",
    details: "Lab-Life Science",
    lat: 0.00,
    lng: 0.00,
    last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });
  classroomsRef.add({
    code: "SE12_416",
    name: "SE12 416",
    building: "SE12",
    level: "4",
    details: "Lab-Life Science",
    lat: 0.00,
    lng: 0.00,
    last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });
  classroomsRef.add({
    code: "SE12_417",
    name: "SE12 417",
    building: "SE12",
    level: "4",
    details: "Lab-Life Science",
    lat: 0.00,
    lng: 0.00,
    last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });
}

