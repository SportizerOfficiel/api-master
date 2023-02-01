class Player {
    constructor(id, idTH, idClub, lastName, firstName, birthDate, sport, category, matchsPlayed, createdAt, updatedAt) {
            this.id = id;
            this.idTH = idTH
            this.idClub = idClub
            this.lastName = lastName;
            this.firstName = firstName;
            this.birthDate = birthDate;
            this.sport = sport;
            this.category = category;
            this.matchsPlayed = matchsPlayed;
            this.createdAt = createdAt
            this.updatedAt = updatedAt
    }

    static playerConverter = {
        toFirestore(player) {
          const returnValue = {
            id: player.id,
            idTH: player.idTH,
            idClub: player.idClub,
            lastName: player.lastName,
            firstName: player.firstName,
            birthDate: player.birthDate,
            sport: player.sport,
            category: player.category,
            matchsPlayed: player.matchsPlayed,
            createdAt: player.createdAt,
            updatedAt: player.updatedAt
          };
    
          Object.keys(returnValue).forEach((key) => {
            
            if (returnValue[key] === undefined) {
              delete returnValue[key];
            }
            if (returnValue[key] === null) {
              returnValue[key] = null
            }
          })
    
          return returnValue;
        },
        fromFirestore(snapshot) {
          const datas = snapshot.data();
          let formatedDate;
          let formatedBirthDate;
          if (datas.createdAt) {
            formatedDate = datas.createdAt.toDate();
          }
          if (datas.birthDate) {
            formatedBirthDate = datas.birthDate.toDate();
          }
          let formatedUpdatedDate;
          if (datas.updatedAt) {
            formatedUpdatedDate = datas.updatedAt.toDate();
          }
    
          const returnValue = new Player(
            snapshot.id,
            datas.idTH,
            datas.idClub,
            datas.lastName,
            datas.firstName,
            formatedBirthDate,
            datas.sport,
            datas.category,
            datas.matchsPlayed,
            formatedDate,
            formatedUpdatedDate
          );
          return returnValue;
        },
      };
}
export default Player;