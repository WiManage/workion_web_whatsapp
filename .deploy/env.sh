#!/bin/sh

# Chemin du fichier .env
ENV_FILE=/usr/src/app/.env

# Supprimer le fichier s'il existe déjà
if [ -f $ENV_FILE ]; then
  rm $ENV_FILE
fi

# Récupérer les variables d'environnement
vars=$(printenv | cut -d= -f1 | sort)

# Créer le fichier .env
touch $ENV_FILE

# Boucle pour écrire les variables
for var in $vars; do

  # Vérifier que la variable est définie
  if [ -z "${var+x}" ]; then
    val="" # non définie
  else
    if [ "$var" = "CONFIG_INIT_INTECH_API_SERVICE" ]; then
      val=""
    else
      val="${!var}"
    fi
  fi

  # Ajouter guillemets si nécessaire
  if [[ "$val" =~ [^\a-zA-Z0-9_] ]]; then
    val=\"$val\"
  fi

  # Écrire la variable dans le fichier .env
  echo "$var=$val" >> "$ENV_FILE"

done

echo "Fichier .env généré à partir des variables d'environnement"

decoded=$(echo "$CONFIG_INIT_INTECH_API_SERVICE" | base64 -d)=$(echo "$CONFIG_INIT_INTECH_API_SERVICE" | base64 -d)
echo "$decoded" > /usr/src/app/service.config.json

echo "Fichier service.config.json généré à partir de l'enrironnement CONFIG_INIT_INTECH_API_SERVICE"
echo "$decoded"

echo "RUNTIME_ENV == $RUNTIME_ENV"
