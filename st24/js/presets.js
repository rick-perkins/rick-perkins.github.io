//////////////////////////////////////////////////////////////////////////////                  //chnage {} to [], add "" to tone and volt and FEC
// Satellite database in program memory space.                                                  //
var SatRecord_DBsat = [                                                                         //
/////////// Start at Longitude 1.0 West so Thor (0.8W) is Considered an Eastern Sat  /////////////  
  [ "Unused",    "",                    // Satellite 0 (Name string, max 22 chars)              // 0,1
    "TRUE", "FALSE",                    // LNBV & Tone ("TRUE", "FALSE", = 18 volts & no tone)  // 2,3     
    10+0xC000,   // 1.0W = Orbital position (in degrees*10) + (bit15=West) + (bit14=Invalid)    // 4
    0,                                  // Pol. angle "FALSE"set (+/-degrees)                   // 5
       0,     0, 0x0000, "AUTO", 100,   // Tuning set 0, Ku-Lo Band, Vertical/RHCP   (13v)      //
       0,     0, 0x0000, "AUTO", 100,   // Tuning set 1, Ku-Lo Band, Horizontal/LHCP (18v)      //
       0,     0, 0x0000, "AUTO", 100,   // Tuning set 2, Ku-Hi Band, Vertical    (13v, 22KHz)   //
       0,     0, 0x0000, "AUTO", 100,   // Tuning set 3, Ku-Hi Band, Horizontal  (18v, 22KHz)   // 21,22,23,24,25
  ],                                                                                            //
  [ "CanalSat Caraibes 34W", "",        // Satellite 1                                          //
    "TRUE", "FALSE",                                                                            //   
    345+0x8000,                                                                                 //
    0,                                                                                          //
       0,     0, 0x0000, "AUTO", 100,                                                         ////////
       0,     0, 0x0000, "AUTO", 100,                                                          //////
       0,     0, 0x0000, "AUTO", 100,                                                           ////
    1805, 30000, 0x0001, "V_34", 100,                                                            //
  ],                                                                                          
  [ "Sky Mexico 58.0W", "",             // Satellite 2                                      WESTWARD
    "TRUE", "FALSE",
    580+0x8000,
    0,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
    1380, 30000, 0x0000, "V_34", 100,
  ],
  [ "Dish Network 61.5W", "",           // Satellite 3
    "TRUE", "FALSE", 
    615+0x8000,
    0,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
    2024, 20000, 0x1002, "AUTO", 100,
  ],    
  [ "DirecTV 72.5W",   "",              // Satellite 4
    "TRUE", "FALSE",
    725+0x8000,
    0,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
    1003, 20000, 0xFFFE, "S_67", 100,
  ],
  [ "Dish Network 72.7W",  "",          // Satellite 5
    "TRUE", "FALSE",
    727+0x8000,                        
    0,                                  
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100, 
       0,     0, 0x0000, "AUTO", 100,                                                
    1820, 20000, 0x1005, "AUTO", 100,
  ],
  [ "Dish Network 77.0W", "",           // Satellite 6
    "FALSE", "FALSE",
    770+0x8000,
    0,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
    1382, 22500, 0x1003, "AUTO", 100,
  ],
  [ "Bell ExpressVu 82.0W", "",         // Satellite 7
    "TRUE", "FALSE",
    820+0x8000,
    0,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
    1907, 20000, 0x0101, "AUTO", 100,
  ],    
  [ "Bell ExpressVu 91.0W", "",         // Satellite 8
    "TRUE", "FALSE",
    910+0x8000,
    0,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
    1936, 20000, 0x0100, "AUTO", 100,
  ],
  [ "Galaxy3C 95.0W",   "",             // Satellite 9
    "TRUE", "FALSE",
    950+0x8000,
    0,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
    1180, 20760, 0x0001, "V_34", 100,
  ],
  [ "DirecTV Latin America",  "",       // Satellite 10 
    "FALSE", "FALSE",
    950+0x8000,
    0,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
    1068, 20000, 0xFFFE, "S_23", 100,
  ], 
  [ "DirecTV 101.0W",   "",             // Satellite 11
    "TRUE", "FALSE",
    1010+0x8000,
    0,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
    1047, 20000, 0xFFFE, "S_67", 100,
  ],    
  [ "Dish Network 110.0W",  "",         // Satellite 12
    "TRUE", "FALSE", 
    1100+0x8000,
    0,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
    2053, 20000, 0x1006, "AUTO", 100,
  ],
  [ "Dish Network 119.0W",  "",         // Satellite 13
    "TRUE", "FALSE",
    1190+0x8000,
    0,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
    2053, 20000, 0x1004, "AUTO", 100,
  ],    
  [ "DirecTV 119.0W",    "",            // Satellite 14
    "TRUE", "FALSE",
    1190+0x8000,
    0,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
    2053, 20000, 0x1004, "AUTO", 100,
  ],    
  [ "Dish Network 129.0W",  "",         // Satellite 15                              EASTWARD
    "FALSE", "FALSE",
    1290+0x8000,                                                                          //
    0,                                                                                   //// 
       0,     0, 0x0000, "AUTO", 100,                                                   //////  
       0,     0, 0x0000, "AUTO", 100,                                                  ////////
       0,     0, 0x0000, "AUTO", 100,                                                     //   
    1266, 20000, 0x1008, "AUTO", 100,                                                     //
  ],                                                                                      //  
////////////////////////////// Internati"TRUE"al Date Line ///////////////////////////////////  
  [ "Optus  156.0E",    "",             // Satellite 16                                   //
    "TRUE", "TRUE",                                                                       //  
    1560+0x0000,                                                                          //
    0,                                                                                    //
       0,     0, 0x0000, "AUTO", 100,                                                  ////////
       0,     0, 0x0000, "AUTO", 100,                                                   //////
       0,     0, 0x0000, "AUTO", 100,                                                    ////
    1798, 27800, 0x1000, "V_34", 100,                                                     //
  ],    
  [ "ABS 5  146.0E",    "",             // Satellite 17                              WESTWARD
    "TRUE", "TRUE", 
    1460+0x0000,
    0,
       0,     0, 0x0000, "AUTO", 100,  
       0,     0, 0x0000, "AUTO", 100,  
       0,     0, 0x0000, "AUTO", 100,  
    2021, 30000, 0x0011, "V_34", 100,      
  ],    
  [ "Apstar 6  134.0E",   "",           // Satellite 18 
    "TRUE", "TRUE", 
    1340+0x0000,
    0,
       0,     0, 0x0000, "AUTO", 100,  
       0,     0, 0x0000, "AUTO", 100,  
       0,     0, 0x0000, "AUTO", 100,  
    2029, 18000, 0x8022, "V_12", 100,
  ],    
  [ "VinaSat 1  132.0E",  "",           // Satellite 19 
    "TRUE", "TRUE", 
    1320+0x0000,
    0,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
    1799, 28500, 0x0000, "V_56", 100,
  ], 
  [ "NSS 11  108.2E",   "",             // Satellite 20 
    "TRUE", "TRUE", 
    1082+0x0000,                        
    0,                                  
       0,     0, 0x0000, "AUTO", 100,      
       0,     0, 0x0000, "AUTO", 100,      
       0,     0, 0x0000, "AUTO", 100,     
    2131, 30000, 0x0000, "V_56", 100,       
  ],
  [ "MeaSat 3  91.5E",    "",           // Satellite 21 
    "TRUE", "TRUE", 
    915+0x0000,
    0,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
    2083, 27500, 0x03E7, "V_34", 100,
  ], 
  [ "ThaiCom 5  78.5E",   "",           // Satellite 22 
    "TRUE", "TRUE", 
    785+0x0000,                        
    0,                                  
       0,     0, 0x0000, "AUTO", 100,      
       0,     0, 0x0000, "AUTO", 100,      
       0,     0, 0x0000, "AUTO", 100,     
    1713, 30000, 0x0000, "V_23", 100,       
  ],
  [ "Turksat  42.0E",    "",            // Satellite 23
    "TRUE", "TRUE", 
    420+0x0000,
    0,
       0,     0, 0x0000, "AUTO", 100,      
       0,     0, 0x0000, "AUTO", 100,      
       0,     0, 0x0000, "AUTO", 100,     
    1262, 27500, 0x0042, "V_56", 100,       
  ],    
  [ "MultiChoice Africa 36E", "",       // Satellite 24
    "TRUE", "TRUE", 
    360+0x0000,
    0,
       0,     0, 0x0000, "AUTO", 100,      
       0,     0, 0x0000, "AUTO", 100,      
       0,     0, 0x0000, "AUTO", 100,     
    1396, 27500, 0x0000, "V_34", 100,       
  ],
  [ "Astra 28.2E (South)",  "",         // Satellite 25 
    "TRUE", "TRUE", 
    282+0x0000,
    0,
       0,     0, 0x0000, "AUTO", 100,  
       0,     0, 0x0000, "AUTO", 100,  
       0,     0, 0x0000, "AUTO", 100,  
    1588, 27500, 0x0020, "V_23", 100,      
  ],    
  [ "Astra 28.2E (North)",  "",         // Satellite 26 
    "TRUE", "TRUE", 
    282+0x0000,
    0,
       0,     0, 0x0000, "AUTO", 100,  
       0,     0, 0x0000, "AUTO", 100,  
       0,     0, 0x0000, "AUTO", 100,  
    1470, 27500, 0x0020, "V_23", 100,
  ],    
  [ "Astra 23.5E",   "",                // Satellite 27 
    "TRUE", "TRUE", 
    235+0x0000,
    0,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
    1314, 27500, 0x0003, "V_34", 100,
  ], 
  [ "Astra 19.2E",    "",               // Satellite 28 
    "TRUE", "TRUE", 
    192+0x0000,
    0,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
       0,     0, 0x0000, "AUTO", 100,
    1548, 27500, 0x0085, "V_34", 100,
  ], 
  [ "Hotbird 13.0E",   "",              // Satellite 29 
    "TRUE", "TRUE", 
    130+0x0000,                        
    0,                                  
       0,     0, 0x0000, "AUTO", 100,      
       0,     0, 0x0000, "AUTO", 100,      
       0,     0, 0x0000, "AUTO", 100,     
    1262, 29900, 0xFBFF, "AUTO", 100,       
  ],
  [ "Astra 4.8E",    "",                // Satellite 30                                     EASTWARD
    "TRUE", "TRUE", 
    48+0x0000,
    0,                                                                                           //
       0,     0, 0x0000, "AUTO", 100,                                                           ////
       0,     0, 0x0000, "AUTO", 100,                                                          //////
       0,     0, 0x0000, "AUTO", 100,                                                         ////////
    1127, 27500, 0x0056, "AUTO", 100,                                                            //
  ],                                                                                             //
///////// Prime Meridian (Actually 1.0W so Thor 0.8W is Considered an Eastern Sat) ////////////  //
  [ "Thor 0.8W",    "",                 // Satellite 31                                          //
    "TRUE", "TRUE",                                                                              // 
    8+0x8000,                                                                                    //
    0,                                                                                           //
       0,     0, 0x0000, "AUTO", 100,                                                         ////////
       0,     0, 0x0000, "AUTO", 100,                                                          //////
       0,     0, 0x0000, "AUTO", 100,                                                           ////
    1338, 28000, 0x0600, "V_78", 100,                                                            //
  ],                                                                                             
];                     // Total # of Sats (DBSIZE) = 32                                     WESTWARD