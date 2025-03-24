# Relacijski model

CREATE TABLE TJUser (
  userId SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  passwordHash TEXT NOT NULL,
  profilePicture TEXT,
  bio TEXT,
  role TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Trip (
  tripId SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  totalCost INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  userId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES TJUser(userId) ON DELETE CASCADE
);

CREATE TABLE Expense (
  expenseId SERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  amount INT NOT NULL,
  currency TEXT NOT NULL,
  data TEXT NOT NULL,
  description TEXT NOT NULL,
  tripId INT NOT NULL,
  FOREIGN KEY (tripId) REFERENCES Trip(tripId) ON DELETE CASCADE
);

CREATE TABLE SharedPost (
  postId SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  userId INT NOT NULL,
  tripId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES TJUser(userId) ON DELETE CASCADE,
  FOREIGN KEY (tripId) REFERENCES Trip(tripId) ON DELETE CASCADE
);

CREATE TABLE didShare (
  userId INT NOT NULL,
  postId INT NOT NULL,
  PRIMARY KEY (userId, postId),
  FOREIGN KEY (userId) REFERENCES TJUser(userId) ON DELETE CASCADE,
  FOREIGN KEY (postId) REFERENCES SharedPost(postId) ON DELETE CASCADE
);

CREATE TABLE Comment (
  commentId SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  userId INT NOT NULL,
  postId INT,
  FOREIGN KEY (userId) REFERENCES TJUser(userId) ON DELETE CASCADE,
  FOREIGN KEY (postId) REFERENCES SharedPost(postId) ON DELETE CASCADE
);

CREATE TABLE Country (
  countryId SERIAL PRIMARY KEY,
  countryName TEXT NOT NULL,
  countryCode INT NOT NULL
);

CREATE TABLE Place (
  placeId SERIAL PRIMARY KEY,
  placeName TEXT NOT NULL,
  placePostalCode INT NOT NULL,
  countryId INT NOT NULL,
  FOREIGN KEY (countryId) REFERENCES Country(countryId) ON DELETE CASCADE
);

CREATE TABLE Location (
  locationId SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  latitude TEXT NOT NULL,
  longitude TEXT NOT NULL,
  placeId INT NULL,
  countryId INT NULL,
  FOREIGN KEY (placeId) REFERENCES Place(placeId) ON DELETE SET NULL,
  FOREIGN KEY (countryId) REFERENCES Country(countryId) ON DELETE SET NULL
);

CREATE TABLE wasLocation (
  tripId INT NOT NULL,
  locationId INT NOT NULL,
  visitedOn DATE NOT NULL,
  notes TEXT NOT NULL,
  vibeRating INT CHECK (vibeRating >= 1 AND vibeRating <= 5) NOT NULL,
  foodRating INT CHECK (foodRating >= 1 AND foodRating <= 5) NOT NULL,
  worthItRating INT CHECK (worthItRating >= 1 AND worthItRating <= 5) NOT NULL,
  PRIMARY KEY (tripId, locationId),
  FOREIGN KEY (tripId) REFERENCES Trip(tripId) ON DELETE CASCADE,
  FOREIGN KEY (locationId) REFERENCES Location(locationId) ON DELETE CASCADE
);

CREATE TABLE Media (
  mediaId SERIAL PRIMARY KEY,
  filePath TEXT NOT NULL,
  mediaType TEXT NOT NULL,
  uploadedAt DATE NOT NULL,
  tripId INT NOT NULL,
  locationId INT NULL,
  FOREIGN KEY (tripId) REFERENCES Trip(tripId) ON DELETE CASCADE,
  FOREIGN KEY (locationId) REFERENCES Location(locationId) ON DELETE SET NULL
);