function downloadFile({ data, fileName, fileType }) {
    const blob = new Blob([data], { type: fileType });
    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
}

export function exportToJson(userActivities) {
    downloadFile({
        data: JSON.stringify(userActivities),
        fileName: 'users.json',
        fileType: 'text/json',
    });
}

export function exportToCsv(userActivities) {
    const headers = ['UserId;Day;Kilogram;Calories'];
    const { userId, sessions } = userActivities;
    const usersCsv = sessions.map(({ day, kilogram, calories }) => (
        [userId, day, kilogram, calories].join(';')
    ));

    downloadFile({
        data: [...headers, ...usersCsv].join('\n'),
        fileName: 'users.csv',
        fileType: 'text/csv',
    });
}
export function exportToCsvUser(user) {
    // En-têtes pour chaque colonne
    const headers = ['UserId,TodayScore'];
    const { id } = user;
    const score = user.todayScore === undefined ? user.score : user.todayScore;
    
    const usersCsv = [id, score*100].join(',');
    downloadFile({
      data: [...headers, usersCsv].join('\n'),
      fileName: 'usersScore.csv',
      fileType: 'text/csv',
    });
  }
  export function exportToCsvAverage(userAverageSessions) {
    // En-têtes pour chaque colonne
    const headers = ['UserId,Day,SessionLength'];
  
    // Accéder directement à `userActivites`
    const { userId, sessions } = userAverageSessions;
  
    // Créer les lignes de données pour le CSV
    const usersCsv = sessions.map((session) => {
      const { day, sessionLength} = session;
      return [userId, day, sessionLength].join(',');
    });
   
    downloadFile({
      data: [...headers, ...usersCsv].join('\n'),
      fileName: 'usersAvreage.csv',
      fileType: 'text/csv',
    })
  }
  export function exportToCsvPerformance (userPerformance){
    // En-têtes pour chaque colonne
    const headers = ['UserId,kind,value'];
  
    // Accéder directement à `userActivites`
    const { userId, kind, data } = userPerformance;
  
    // Créer les lignes de données pour le CSV
    const usersCsv = data.map((val) => {
      const activityType = kind[val.kind]; // Traduire le numéro en nom de type
      return [userId, activityType, val.value].join(',');
    });
   
    downloadFile({
      data: [...headers, ...usersCsv].join('\n'),
      fileName: 'usersPerformance.csv',
      fileType: 'text/csv',
    })
  }
  export function exportToCsvKeyData (user){
    // En-têtes pour chaque colonne
    const headers = ['UserId,calorie,protein,carbohydrate,lipid'];
  
    // Accéder directement à `userActivites`
    const { id, keyData} = user;
  
    // Créer les lignes de données pour le CSV
    const usersCsv = [id, keyData["calorieCount"], keyData["proteinCount"],keyData["carbohydrateCount"],keyData["lipidCount"]].join(',');
    
   
    downloadFile({
      data: [...headers,usersCsv].join('\n'),
      fileName: 'usersKeyData.csv',
      fileType: 'text/csv',
    })
  }