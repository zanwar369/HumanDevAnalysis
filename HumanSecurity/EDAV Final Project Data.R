library(tidyverse)
Homeless.natural.disaster <- read.csv("Homeless.natural.disaster.csv")
Homicide.rate <- read.csv("Homicide.rate.csv")
Prison.popn <- read.csv("Prison.population.csv")
Refugees <- read.csv("Refugees.csv")
Suicide.rate.M <- read.csv("Suicide.rate.M.csv")
Suicide.rate.F <- read.csv("Suicide.rate.F.csv")

names(Homeless.natural.disaster)[2:30] <- c("1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018")

Homicide.rate <- subset(Homicide.rate, select = -c(X, X.1, X.2, X.3, X.4, X.5, X.6, X.7, X.8, X.9, X.10))
names(Homicide.rate)[2:13] <- c("1990", "1995", "2000", "2005", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017")

Prison.popn <- subset(Prison.popn, select = -c(X, X.1, X.2, X.3, X.4, X.5, X.6, X.7, X.8, X.9))
names(Prison.popn)[2:11] <- c("2003", "2005", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017")

Refugees <- subset(Refugees, select = -c(X, X.1, X.2, X.3, X.4, X.5, X.6, X.7, X.8, X.9))
names(Refugees)[2:11] <- c("2003", "2005", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017")

Suicide.rate.F <- subset(Suicide.rate.F, select = -c(X, X.1, X.2))
names(Suicide.rate.F)[2:5] <- c("2000", "2010", "2015", "2016")

Suicide.rate.M <- subset(Suicide.rate.M, select = -c(X, X.1, X.2))
names(Suicide.rate.M)[2:5] <- c("2000", "2010", "2015", "2016")

HND <- pivot_longer(Homeless.natural.disaster, cols = !Country, names_to = "Year", values_to = "Homeless.ND")
HR <- pivot_longer(Homicide.rate, cols = !Country, names_to = "Year", values_to = "Homicide.rate")
PP <- pivot_longer(Prison.popn, cols = !Country, names_to = "Year", values_to = "Prison.popn")
R <- pivot_longer(Refugees, cols = !Country, names_to = "Year", values_to = "Refugees")
SRF <- pivot_longer(Suicide.rate.F, cols = !Country, names_to = "Year", values_to = "Suicide.rate.F")
SRM <- pivot_longer(Suicide.rate.M, cols = !Country, names_to = "Year", values_to = "Suicide.rate.M")

Human.Security <- merge(HND, HR, all.x = T, all.y = T)
Human.Security <- merge(Human.Security, PP, all.x = T, all.y = T)
Human.Security <- merge(Human.Security, R, all.x = T, all.y = T)
Human.Security <- merge(Human.Security, SRF, all.x = T, all.y = T)  
Human.Security <- merge(Human.Security, SRM, all.x = T, all.y = T)
Human.Security <- Human.Security[30:5684,]

write.csv(Human.Security, "Human.Security.csv") 




