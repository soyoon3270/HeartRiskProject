// ==========================
// Personalized analysis content, per answer, per language
// ==========================
window.analysisData = {

en: {

age: {
under30: {
title: "Age: Under 30",
average: "Cardiovascular disease is relatively uncommon in this age group.",
explanation: "Although the short-term risk is generally low, developing healthy habits early—such as regular exercise, a balanced diet, and avoiding smoking—helps reduce lifetime cardiovascular risk."
},
"30-39": {
title: "Age: 30–39",
average: "Cardiovascular risk begins to increase gradually during adulthood.",
explanation: "Risk factors like elevated cholesterol or high blood pressure may start developing silently. Routine health screenings become increasingly important."
},
"40-49": {
title: "Age: 40–49",
average: "Heart disease becomes noticeably more common after age 40.",
explanation: "Maintaining healthy blood pressure, cholesterol, and body weight can significantly lower future cardiovascular risk."
},
"50-59": {
title: "Age: 50–59",
average: "Many cardiovascular events begin occurring more frequently during this decade.",
explanation: "Lifestyle choices continue to have a major influence. Regular medical checkups are strongly recommended."
},
"60-69": {
title: "Age: 60–69",
average: "Older adults experience substantially higher rates of cardiovascular disease.",
explanation: "Arteries naturally stiffen with age, increasing blood pressure and cardiovascular strain. Healthy habits remain highly beneficial."
},
"70plus": {
title: "Age: 70+",
average: "Cardiovascular disease becomes increasingly common in this age group.",
explanation: "Age is a major non-modifiable risk factor, but treatment adherence and lifestyle choices continue to improve long-term outcomes."
}
},

bmi: {
underweight: {
title: "BMI",
average: "Being underweight may sometimes indicate nutritional deficiencies.",
explanation: "Although obesity receives more attention, being significantly underweight can also affect cardiovascular and overall health."
},
healthy: {
title: "BMI",
average: "A healthy BMI is generally associated with lower cardiovascular risk.",
explanation: "Maintaining a healthy weight supports healthy blood pressure, cholesterol, and glucose levels."
},
overweight: {
title: "BMI",
average: "Overweight individuals have an increased likelihood of developing hypertension and diabetes.",
explanation: "Losing even a modest amount of weight can improve cardiovascular health."
},
obese: {
title: "BMI",
average: "Obesity is one of the strongest modifiable cardiovascular risk factors.",
explanation: "Excess body fat increases strain on the heart and contributes to high blood pressure, diabetes, and elevated cholesterol."
}
},

exercise: {
"5": {
title: "Exercise",
average: "Meeting recommended activity levels is associated with lower cardiovascular risk.",
explanation: "Excellent! Regular exercise strengthens the heart and improves circulation."
},
"3": {
title: "Exercise",
average: "Moderate exercise provides significant cardiovascular benefits.",
explanation: "Increasing activity to most days of the week may provide additional health benefits."
},
"1": {
title: "Exercise",
average: "Limited physical activity provides some benefit but may not meet health recommendations.",
explanation: "Increasing exercise frequency could help reduce long-term cardiovascular risk."
},
"0": {
title: "Exercise",
average: "Physical inactivity is associated with increased cardiovascular disease.",
explanation: "Try to gradually increase your weekly activity. Even brisk walking can improve heart health."
}
},

smoking: {
never: {
title: "Smoking",
average: "Non-smokers generally have the lowest cardiovascular risk.",
explanation: "Avoiding tobacco protects blood vessels and lowers heart attack and stroke risk."
},
former: {
title: "Smoking",
average: "Former smokers gradually reduce their cardiovascular risk over time.",
explanation: "Remaining smoke-free allows your heart and blood vessels to recover."
},
sometimes: {
title: "Smoking",
average: "Even occasional smoking increases cardiovascular risk.",
explanation: "There is no completely safe level of tobacco exposure."
},
daily: {
title: "Smoking",
average: "Daily smokers have substantially higher cardiovascular risk than non-smokers.",
explanation: "Quitting smoking is one of the most effective ways to improve heart health."
}
},

bp: {
yes: {
title: "Blood Pressure",
average: "Hypertension is a leading contributor to heart disease and stroke.",
explanation: "Managing blood pressure through lifestyle changes and medication when prescribed can greatly reduce cardiovascular risk."
},
unsure: {
title: "Blood Pressure",
average: "Many people with hypertension are unaware they have it.",
explanation: "Consider having your blood pressure checked regularly."
},
no: {
title: "Blood Pressure",
average: "Normal blood pressure supports healthy arteries and heart function.",
explanation: "Continue monitoring your blood pressure during routine medical visits."
}
},

cholesterol: {
yes: {
title: "Cholesterol",
average: "High cholesterol contributes to plaque buildup in arteries.",
explanation: "Healthy eating, exercise, and medication when prescribed can lower cholesterol levels."
},
no: {
title: "Cholesterol",
average: "Healthy cholesterol levels reduce cardiovascular risk.",
explanation: "Continue following heart-healthy lifestyle habits."
}
},

family: {
yes: {
title: "Family History",
average: "A family history of cardiovascular disease increases inherited risk.",
explanation: "Although genetics cannot be changed, maintaining healthy habits can significantly reduce overall risk."
},
no: {
title: "Family History",
average: "No known family history reduces inherited cardiovascular risk.",
explanation: "Lifestyle remains the strongest factor you can control."
},
unsure: {
title: "Family History",
average: "Not knowing your family history makes inherited cardiovascular risk harder to estimate.",
explanation: "If possible, ask family members about any history of heart disease. Even without this information, maintaining healthy habits remains important."
}
},

diabetes: {
type1: {
title: "Diabetes: Type 1",
average: "Type 1 diabetes significantly increases long-term cardiovascular risk.",
explanation: "Consistent blood sugar management is one of the most important ways to protect your heart and blood vessels."
},
type2: {
title: "Diabetes: Type 2",
average: "Type 2 diabetes is strongly linked to heart disease, including diabetic cardiomyopathy.",
explanation: "Managing blood sugar, blood pressure, and cholesterol together provides the greatest protection for your heart."
},
prediabetes: {
title: "Prediabetes",
average: "Prediabetes already begins to affect blood vessels before full diabetes develops.",
explanation: "Lifestyle changes at this stage can often prevent progression to type 2 diabetes and reduce cardiovascular risk."
},
no: {
title: "Diabetes",
average: "No diagnosed diabetes reduces one major pathway to cardiovascular disease.",
explanation: "Maintaining healthy blood sugar levels through diet and exercise helps keep it that way."
}
},

diet: {
homecooked: {
title: "Diet",
average: "A diet built around home-cooked, whole foods is associated with lower cardiovascular risk.",
explanation: "Keep favoring vegetables, lean proteins, and minimally processed ingredients."
},
mostlyhome: {
title: "Diet",
average: "A mostly home-cooked diet with some eating out provides a reasonable balance.",
explanation: "Reducing fast food or processed meals a bit further could lower long-term risk even more."
},
eatingout: {
title: "Diet",
average: "Frequent eating out or street food several times a week increases exposure to excess sodium, sugar, and unhealthy fats.",
explanation: "Try replacing a few weekly meals with home-cooked alternatives to reduce cardiovascular strain."
},
processed: {
title: "Diet",
average: "A diet high in fried, processed, or sugary foods is one of the strongest modifiable risk factors for heart disease.",
explanation: "Gradually introducing whole foods and home-cooked meals can meaningfully improve cardiovascular health over time."
}
},

activity: {
sitting: {
title: "Daily Activity",
average: "Spending most of the day sitting is linked to higher cardiovascular risk, independent of exercise habits.",
explanation: "Standing up and moving briefly every hour can help offset the effects of prolonged sitting."
},
standing: {
title: "Daily Activity",
average: "Spending most of the day standing is generally better for cardiovascular health than sitting.",
explanation: "Combining this with regular movement further supports heart health."
},
physical: {
title: "Daily Activity",
average: "Regular physically demanding activity throughout the day supports strong cardiovascular health.",
explanation: "Keep it up — consistent movement is one of the best protective habits."
}
},

sugar: {
never: {
title: "Sugary Beverages",
average: "Avoiding sugary drinks significantly lowers your risk of diabetes and related heart complications.",
explanation: "Continue choosing water or unsweetened beverages."
},
"1-2": {
title: "Sugary Beverages",
average: "Occasional sugary drinks have a relatively small impact on cardiovascular risk.",
explanation: "Keeping this to a minimum continues to protect long-term heart health."
},
"3-6": {
title: "Sugary Beverages",
average: "Drinking sugary beverages several times a week contributes to chronic high blood sugar over time.",
explanation: "Cutting back gradually can reduce strain on blood vessels and the heart."
},
daily: {
title: "Sugary Beverages",
average: "Daily sugary drink consumption is a major contributor to insulin resistance and vascular damage.",
explanation: "Reducing sugary drinks is one of the most effective changes you can make for your heart."
},
"3daily": {
title: "Sugary Beverages",
average: "Very high sugary drink consumption places significant strain on blood sugar regulation and cardiovascular health.",
explanation: "This is one of the most impactful areas to address — even cutting back gradually can make a real difference."
}
}

}, // end en

es: {

age: {
under30: {
title: "Edad: Menos de 30",
average: "La enfermedad cardiovascular es relativamente poco común en este grupo de edad.",
explanation: "Aunque el riesgo a corto plazo generalmente es bajo, desarrollar hábitos saludables desde temprano —como ejercicio regular, una dieta equilibrada y evitar el tabaco— ayuda a reducir el riesgo cardiovascular de por vida."
},
"30-39": {
title: "Edad: 30–39",
average: "El riesgo cardiovascular comienza a aumentar gradualmente durante la adultez.",
explanation: "Factores de riesgo como el colesterol elevado o la presión arterial alta pueden empezar a desarrollarse en silencio. Los chequeos médicos de rutina se vuelven cada vez más importantes."
},
"40-49": {
title: "Edad: 40–49",
average: "Las enfermedades cardíacas se vuelven notablemente más comunes después de los 40 años.",
explanation: "Mantener una presión arterial, colesterol y peso corporal saludables puede reducir significativamente el riesgo cardiovascular futuro."
},
"50-59": {
title: "Edad: 50–59",
average: "Muchos eventos cardiovasculares comienzan a ocurrir con mayor frecuencia durante esta década.",
explanation: "Las decisiones de estilo de vida siguen teniendo una gran influencia. Se recomienda encarecidamente realizar chequeos médicos regulares."
},
"60-69": {
title: "Edad: 60–69",
average: "Los adultos mayores presentan tasas sustancialmente más altas de enfermedad cardiovascular.",
explanation: "Las arterias se endurecen naturalmente con la edad, lo que aumenta la presión arterial y la tensión cardiovascular. Los hábitos saludables siguen siendo muy beneficiosos."
},
"70plus": {
title: "Edad: 70+",
average: "La enfermedad cardiovascular se vuelve cada vez más común en este grupo de edad.",
explanation: "La edad es un factor de riesgo importante que no se puede modificar, pero la adherencia al tratamiento y las decisiones de estilo de vida continúan mejorando los resultados a largo plazo."
}
},

bmi: {
underweight: {
title: "IMC",
average: "Tener bajo peso a veces puede indicar deficiencias nutricionales.",
explanation: "Aunque la obesidad recibe más atención, tener un peso significativamente bajo también puede afectar la salud cardiovascular y general."
},
healthy: {
title: "IMC",
average: "Un IMC saludable generalmente se asocia con un menor riesgo cardiovascular.",
explanation: "Mantener un peso saludable favorece niveles saludables de presión arterial, colesterol y glucosa."
},
overweight: {
title: "IMC",
average: "Las personas con sobrepeso tienen una mayor probabilidad de desarrollar hipertensión y diabetes.",
explanation: "Perder incluso una cantidad modesta de peso puede mejorar la salud cardiovascular."
},
obese: {
title: "IMC",
average: "La obesidad es uno de los factores de riesgo cardiovascular modificables más fuertes.",
explanation: "El exceso de grasa corporal aumenta la carga de trabajo del corazón y contribuye a la presión arterial alta, la diabetes y el colesterol elevado."
}
},

exercise: {
"5": {
title: "Ejercicio",
average: "Cumplir con los niveles de actividad recomendados se asocia con un menor riesgo cardiovascular.",
explanation: "¡Excelente! El ejercicio regular fortalece el corazón y mejora la circulación."
},
"3": {
title: "Ejercicio",
average: "El ejercicio moderado proporciona beneficios cardiovasculares importantes.",
explanation: "Aumentar la actividad a la mayoría de los días de la semana podría aportar beneficios adicionales para la salud."
},
"1": {
title: "Ejercicio",
average: "La actividad física limitada aporta algún beneficio, pero podría no cumplir con las recomendaciones de salud.",
explanation: "Aumentar la frecuencia del ejercicio podría ayudar a reducir el riesgo cardiovascular a largo plazo."
},
"0": {
title: "Ejercicio",
average: "La inactividad física se asocia con un mayor riesgo de enfermedad cardiovascular.",
explanation: "Intenta aumentar gradualmente tu actividad semanal. Incluso caminar a paso rápido puede mejorar la salud del corazón."
}
},

smoking: {
never: {
title: "Tabaquismo",
average: "Las personas que no fuman generalmente tienen el menor riesgo cardiovascular.",
explanation: "Evitar el tabaco protege los vasos sanguíneos y reduce el riesgo de infarto y accidente cerebrovascular."
},
former: {
title: "Tabaquismo",
average: "Los exfumadores reducen gradualmente su riesgo cardiovascular con el tiempo.",
explanation: "Mantenerte sin fumar permite que tu corazón y tus vasos sanguíneos se recuperen."
},
sometimes: {
title: "Tabaquismo",
average: "Incluso fumar ocasionalmente aumenta el riesgo cardiovascular.",
explanation: "No existe un nivel completamente seguro de exposición al tabaco."
},
daily: {
title: "Tabaquismo",
average: "Las personas que fuman a diario tienen un riesgo cardiovascular sustancialmente más alto que quienes no fuman.",
explanation: "Dejar de fumar es una de las formas más efectivas de mejorar la salud del corazón."
}
},

bp: {
yes: {
title: "Presión Arterial",
average: "La hipertensión es uno de los principales factores que contribuyen a las enfermedades cardíacas y los accidentes cerebrovasculares.",
explanation: "Controlar la presión arterial mediante cambios en el estilo de vida y medicamentos (cuando se recetan) puede reducir considerablemente el riesgo cardiovascular."
},
unsure: {
title: "Presión Arterial",
average: "Muchas personas con hipertensión no saben que la tienen.",
explanation: "Considera revisar tu presión arterial con regularidad."
},
no: {
title: "Presión Arterial",
average: "Una presión arterial normal favorece arterias sanas y un buen funcionamiento del corazón.",
explanation: "Continúa monitoreando tu presión arterial durante tus consultas médicas de rutina."
}
},

cholesterol: {
yes: {
title: "Colesterol",
average: "El colesterol alto contribuye a la acumulación de placa en las arterias.",
explanation: "Una alimentación saludable, el ejercicio y los medicamentos (cuando se recetan) pueden reducir los niveles de colesterol."
},
no: {
title: "Colesterol",
average: "Los niveles saludables de colesterol reducen el riesgo cardiovascular.",
explanation: "Continúa siguiendo hábitos de vida saludables para el corazón."
}
},

family: {
yes: {
title: "Antecedentes Familiares",
average: "Tener antecedentes familiares de enfermedad cardiovascular aumenta el riesgo heredado.",
explanation: "Aunque la genética no se puede cambiar, mantener hábitos saludables puede reducir significativamente el riesgo general."
},
no: {
title: "Antecedentes Familiares",
average: "No tener antecedentes familiares conocidos reduce el riesgo cardiovascular heredado.",
explanation: "El estilo de vida sigue siendo el factor más importante que puedes controlar."
},
unsure: {
title: "Antecedentes Familiares",
average: "No conocer tus antecedentes familiares dificulta estimar el riesgo cardiovascular heredado.",
explanation: "Si es posible, pregunta a tus familiares sobre antecedentes de enfermedades cardíacas. Incluso sin esta información, mantener hábitos saludables sigue siendo importante."
}
},

diabetes: {
type1: {
title: "Diabetes: Tipo 1",
average: "La diabetes tipo 1 aumenta significativamente el riesgo cardiovascular a largo plazo.",
explanation: "El control constante del azúcar en sangre es una de las formas más importantes de proteger tu corazón y tus vasos sanguíneos."
},
type2: {
title: "Diabetes: Tipo 2",
average: "La diabetes tipo 2 está fuertemente relacionada con enfermedades cardíacas, incluida la cardiomiopatía diabética.",
explanation: "Controlar juntos el azúcar en sangre, la presión arterial y el colesterol brinda la mayor protección para tu corazón."
},
prediabetes: {
title: "Prediabetes",
average: "La prediabetes ya comienza a afectar los vasos sanguíneos antes de que se desarrolle la diabetes completa.",
explanation: "Los cambios en el estilo de vida en esta etapa a menudo pueden prevenir la progresión a la diabetes tipo 2 y reducir el riesgo cardiovascular."
},
no: {
title: "Diabetes",
average: "No tener un diagnóstico de diabetes reduce una vía importante hacia la enfermedad cardiovascular.",
explanation: "Mantener niveles saludables de azúcar en sangre mediante la dieta y el ejercicio ayuda a que siga siendo así."
}
},

diet: {
homecooked: {
title: "Dieta",
average: "Una dieta basada en comida casera y alimentos integrales se asocia con un menor riesgo cardiovascular.",
explanation: "Continúa favoreciendo las verduras, las proteínas magras y los ingredientes mínimamente procesados."
},
mostlyhome: {
title: "Dieta",
average: "Una dieta mayormente casera con algo de comida fuera de casa ofrece un equilibrio razonable.",
explanation: "Reducir un poco más la comida rápida o los alimentos procesados podría disminuir aún más el riesgo a largo plazo."
},
eatingout: {
title: "Dieta",
average: "Comer fuera o comida callejera con frecuencia varias veces por semana aumenta la exposición a un exceso de sodio, azúcar y grasas poco saludables.",
explanation: "Intenta reemplazar algunas comidas semanales con alternativas caseras para reducir la tensión cardiovascular."
},
processed: {
title: "Dieta",
average: "Una dieta alta en alimentos fritos, procesados o azucarados es uno de los factores de riesgo modificables más fuertes para las enfermedades cardíacas.",
explanation: "Introducir gradualmente alimentos integrales y comidas caseras puede mejorar significativamente la salud cardiovascular con el tiempo."
}
},

activity: {
sitting: {
title: "Actividad Diaria",
average: "Pasar la mayor parte del día sentado se relaciona con un mayor riesgo cardiovascular, independientemente de los hábitos de ejercicio.",
explanation: "Levantarte y moverte brevemente cada hora puede ayudar a contrarrestar los efectos de estar sentado por mucho tiempo."
},
standing: {
title: "Actividad Diaria",
average: "Pasar la mayor parte del día de pie generalmente es mejor para la salud cardiovascular que estar sentado.",
explanation: "Combinar esto con movimiento regular favorece aún más la salud del corazón."
},
physical: {
title: "Actividad Diaria",
average: "Realizar actividad físicamente demandante con regularidad durante el día favorece una salud cardiovascular fuerte.",
explanation: "¡Sigue así! El movimiento constante es uno de los mejores hábitos de protección."
}
},

sugar: {
never: {
title: "Bebidas Azucaradas",
average: "Evitar las bebidas azucaradas reduce significativamente tu riesgo de diabetes y complicaciones cardíacas relacionadas.",
explanation: "Continúa eligiendo agua o bebidas sin azúcar."
},
"1-2": {
title: "Bebidas Azucaradas",
average: "Las bebidas azucaradas ocasionales tienen un impacto relativamente pequeño en el riesgo cardiovascular.",
explanation: "Mantener esto al mínimo sigue protegiendo la salud del corazón a largo plazo."
},
"3-6": {
title: "Bebidas Azucaradas",
average: "Beber bebidas azucaradas varias veces por semana contribuye a un azúcar en sangre crónicamente alto con el tiempo.",
explanation: "Reducir gradualmente puede disminuir la tensión sobre los vasos sanguíneos y el corazón."
},
daily: {
title: "Bebidas Azucaradas",
average: "El consumo diario de bebidas azucaradas es un factor importante en la resistencia a la insulina y el daño vascular.",
explanation: "Reducir las bebidas azucaradas es uno de los cambios más efectivos que puedes hacer por tu corazón."
},
"3daily": {
title: "Bebidas Azucaradas",
average: "Un consumo muy alto de bebidas azucaradas genera una tensión considerable sobre la regulación del azúcar en sangre y la salud cardiovascular.",
explanation: "Esta es una de las áreas con mayor impacto para abordar — incluso reducirlo gradualmente puede marcar una diferencia real."
}
}

} // end es

};

// ==========================
// "Why this matters" mechanism text, per language
// ==========================
window.categoryMechanisms = {

en: {
bmi: {
mechanism: "Excess body fat increases the heart's workload and raises blood pressure, cholesterol, and blood sugar — all of which strain the cardiovascular system over time.",
future: "Even a modest reduction in weight (5–10%) can lower blood pressure and improve cholesterol levels within months."
},
diet: {
mechanism: "Diets high in sugar and processed food raise blood glucose repeatedly, which over years forms compounds called AGEs that stiffen heart and blood vessel tissue (fibrosis).",
future: "Shifting toward more home-cooked, whole-food meals can slow this process and improve blood sugar control within weeks."
},
exercise: {
mechanism: "Physical inactivity weakens the heart muscle and reduces circulation efficiency, contributing to higher blood pressure and poorer blood sugar regulation.",
future: "Just 150 minutes of moderate exercise per week can meaningfully strengthen the heart and lower resting blood pressure."
},
smoking: {
mechanism: "Tobacco damages the lining of blood vessels, accelerates plaque buildup, and reduces oxygen delivery to the heart.",
future: "Blood vessel function begins improving within weeks of quitting, and cardiovascular risk drops significantly within a few years."
},
bp: {
mechanism: "Chronically high blood pressure forces the heart to work harder, thickening and eventually weakening the heart muscle over time.",
future: "Managing blood pressure through diet, exercise, and medication (if prescribed) reduces strain on the heart almost immediately."
},
sugar: {
mechanism: "Frequent sugary drinks cause repeated blood sugar spikes, contributing to insulin resistance and the same AGE-driven vascular stiffening seen in diabetes.",
future: "Cutting back on sugary drinks can improve blood sugar stability within days to weeks."
},
diabetes: {
mechanism: "Persistently high blood sugar damages small blood vessels and heart tissue, a process linked to diabetic cardiomyopathy.",
future: "Consistent blood sugar management significantly slows or prevents this damage over time."
},
activity: {
mechanism: "Prolonged sitting is linked to poorer circulation and metabolic changes that raise cardiovascular risk, independent of formal exercise.",
future: "Standing or moving briefly every hour can help offset the effects of a sedentary day."
},
cholesterol: {
mechanism: "Excess cholesterol contributes to plaque buildup inside artery walls, narrowing them and restricting blood flow to the heart.",
future: "Dietary changes, exercise, and medication when needed can lower cholesterol and reduce plaque progression."
},
family: {
mechanism: "A family history suggests inherited factors that may predispose you to cardiovascular disease, though lifestyle still plays a major role.",
future: "Knowing this risk earlier allows for more proactive monitoring and lifestyle choices to offset genetic predisposition."
}
},

es: {
bmi: {
mechanism: "El exceso de grasa corporal aumenta la carga de trabajo del corazón y eleva la presión arterial, el colesterol y el azúcar en sangre — todo lo cual sobrecarga el sistema cardiovascular con el tiempo.",
future: "Incluso una reducción modesta de peso (5–10%) puede disminuir la presión arterial y mejorar los niveles de colesterol en pocos meses."
},
diet: {
mechanism: "Las dietas altas en azúcar y alimentos procesados elevan repetidamente la glucosa en sangre, lo que con los años forma compuestos llamados AGE que endurecen el tejido del corazón y los vasos sanguíneos (fibrosis).",
future: "Cambiar hacia comidas más caseras y de alimentos integrales puede desacelerar este proceso y mejorar el control del azúcar en sangre en cuestión de semanas."
},
exercise: {
mechanism: "La inactividad física debilita el músculo cardíaco y reduce la eficiencia de la circulación, lo que contribuye a una presión arterial más alta y una peor regulación del azúcar en sangre.",
future: "Tan solo 150 minutos de ejercicio moderado por semana pueden fortalecer significativamente el corazón y reducir la presión arterial en reposo."
},
smoking: {
mechanism: "El tabaco daña el revestimiento de los vasos sanguíneos, acelera la acumulación de placa y reduce la entrega de oxígeno al corazón.",
future: "La función de los vasos sanguíneos comienza a mejorar semanas después de dejar de fumar, y el riesgo cardiovascular disminuye significativamente en unos pocos años."
},
bp: {
mechanism: "La presión arterial crónicamente alta obliga al corazón a trabajar más, engrosando y eventualmente debilitando el músculo cardíaco con el tiempo.",
future: "Controlar la presión arterial mediante la dieta, el ejercicio y medicamentos (si se recetan) reduce la carga sobre el corazón casi de inmediato."
},
sugar: {
mechanism: "Las bebidas azucaradas frecuentes causan picos repetidos de azúcar en sangre, lo que contribuye a la resistencia a la insulina y al mismo endurecimiento vascular impulsado por los AGE que se observa en la diabetes.",
future: "Reducir las bebidas azucaradas puede mejorar la estabilidad del azúcar en sangre en cuestión de días a semanas."
},
diabetes: {
mechanism: "El azúcar en sangre persistentemente alto daña los vasos sanguíneos pequeños y el tejido cardíaco, un proceso relacionado con la cardiomiopatía diabética.",
future: "El control constante del azúcar en sangre desacelera o previene significativamente este daño con el tiempo."
},
activity: {
mechanism: "Estar sentado por períodos prolongados se relaciona con una peor circulación y cambios metabólicos que aumentan el riesgo cardiovascular, independientemente del ejercicio formal.",
future: "Ponerte de pie o moverte brevemente cada hora puede ayudar a contrarrestar los efectos de un día sedentario."
},
cholesterol: {
mechanism: "El exceso de colesterol contribuye a la acumulación de placa dentro de las paredes arteriales, estrechándolas y restringiendo el flujo de sangre hacia el corazón.",
future: "Los cambios en la dieta, el ejercicio y los medicamentos cuando sean necesarios pueden reducir el colesterol y disminuir la progresión de la placa."
},
family: {
mechanism: "Los antecedentes familiares sugieren factores heredados que podrían predisponerte a la enfermedad cardiovascular, aunque el estilo de vida sigue teniendo un papel importante.",
future: "Conocer este riesgo desde antes permite un monitoreo más proactivo y decisiones de estilo de vida para contrarrestar la predisposición genética."
}
}

};