# 🔋 Projet Instrumentation 4.0 - Optimisation Énergétique

## 📋 Vue d'ensemble
**Entreprise:** RENAULT GROUP - Le Mans  
**Période:** Octobre 2021 - Septembre 2024  
**Rôle:** Chef de projet Industrie 4.0 (Apprenti Ingénieur)  

## 🎯 Contexte et Objectifs

### Problématique
Les départements de cataphorèse et fonderie de l'usine Renault du Mans représentaient les procédés les plus énergivores du site, avec une consommation annuelle significative et des coûts énergétiques en constante augmentation.

### Objectifs du projet
1. **Identifier** les équipements les plus consommateurs d'énergie
2. **Instrumenter** les process pour un suivi en temps réel
3. **Optimiser** la consommation énergétique globale
4. **Créer** un système de supervision intelligent
5. **Réduire** l'empreinte carbone et les coûts

## 🛠️ Solutions Techniques Implémentées

### Architecture du Système

```
┌─────────────────────────────────────────────────┐
│                  SUPERVISION                      │
│                   (Grafana)                       │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│              BASE DE DONNÉES                     │
│               (PostgreSQL)                       │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│            COLLECTE DE DONNÉES                   │
│         (Node-RED, MQTT, OPC-UA)                │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│              AUTOMATES                           │
│    (Schneider TM251, IFM AE3100)                │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│             CAPTEURS                             │
│  (PAC3200, Débitmètres, Compteurs)              │
└──────────────────────────────────────────────────┘
```

### Technologies Utilisées

#### Hardware
- **Automates:** Schneider TM251, IFM AE3100
- **Capteurs électriques:** PAC3200
- **Débitmètres:** FD-Q Keyence
- **Compteurs:** Khrone (air comprimé)

#### Software
- **Programmation automates:** Machine Expert, Codesys
- **Base de données:** PostgreSQL
- **Collecte de données:** Node-RED
- **Protocoles:** MQTT, OPC-UA, Profinet, Modbus TCP
- **Visualisation:** Grafana
- **Développement:** Python (Pandas, Matplotlib)

## 📊 Réalisations Clés

### 1. Pilotage et Gestion de Projet
- Planification complète du projet (MS Project)
- Gestion du budget (>500k€)
- Animation d'équipe pluridisciplinaire
- Suivi fournisseurs et sous-traitants

### 2. Développement Technique
```python
# Exemple de script Python pour l'automatisation
import pandas as pd
import psycopg2
from datetime import datetime

def collect_energy_data():
    """
    Collecte automatique des données énergétiques
    """
    # Connexion à la base PostgreSQL
    conn = psycopg2.connect(
        host="server_address",
        database="energy_db",
        user="user",
        password="password"
    )
    
    # Récupération et traitement des données
    query = """
    SELECT timestamp, equipment_id, 
           power_consumption, gas_flow, water_flow
    FROM energy_metrics
    WHERE timestamp >= NOW() - INTERVAL '1 hour'
    """
    
    df = pd.read_sql(query, conn)
    
    # Calcul des KPIs
    df['efficiency'] = calculate_efficiency(df)
    
    return df
```

### 3. Dashboards de Supervision

#### Dashboard Principal - Grafana
- **Vue temps réel** des consommations (Électricité, Gaz, Eau, Air comprimé)
- **Alertes automatiques** en cas de dépassement de seuils
- **Historiques** et tendances sur 12 mois
- **KPIs** de performance énergétique

### 4. Configuration des Seuils
- Définition des seuils par équipement
- Système d'alertes multi-niveaux
- Notifications automatiques aux responsables

## 🎯 Résultats et Impact

### Résultats Quantitatifs
| Métrique | Avant | Après | Amélioration |
|----------|-------|-------|--------------|
| Consommation énergétique | 100% | 70% | **-30%** |
| Coût annuel énergie | 2.5M€ | 1.75M€ | **-750k€** |
| Temps de détection panne | 4h | 30min | **-87.5%** |
| Émissions CO2 | 1200t | 840t | **-360t** |

### Bénéfices Additionnels
- ✅ Système modulable et évolutif
- ✅ Formation de 15 opérateurs
- ✅ Documentation complète
- ✅ ROI atteint en 18 mois
- ✅ Certification ISO 50001 facilitée

## 📈 Évolutions Futures

### Phase 2 - Intelligence Artificielle
- Implémentation de modèles prédictifs
- Maintenance prédictive avancée
- Optimisation automatique des paramètres

### Phase 3 - Extension
- Déploiement sur d'autres sites Renault
- Intégration avec le système MES global
- Connexion au réseau smart grid

## 👥 Équipe Projet

- **Chef de projet:** Badohma BAKAYOKO
- **Maître d'apprentissage:** Julien SIMON
- **Expert Automatisme:** Sylvain DESHAYES
- **Équipe technique:** 8 personnes

## 📝 Compétences Développées

- ✨ Gestion de projet industriel complexe
- ✨ Programmation d'automates industriels
- ✨ Architecture IoT et Industry 4.0
- ✨ Analyse de données énergétiques
- ✨ ROI et business case
- ✨ Management transversal

## 🏆 Reconnaissance

Ce projet a été présenté comme **Best Practice** lors de la convention Renault Digital 2024 et a servi de modèle pour le déploiement dans d'autres usines du groupe.

---

📧 **Contact:** badohma@yahoo.com | 💼 [LinkedIn](https://linkedin.com/in/badohma)
