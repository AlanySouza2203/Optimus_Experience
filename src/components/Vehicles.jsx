import React, { useState, useEffect } from 'react';
import { Users, Fuel, Gauge, Zap, Check, ArrowRight } from 'lucide-react';
import './Vehicles.css';


export const localBackupData = [
  {
    id: 1,
    brand: 'CHEVROLET',
    year: '2023',
    name: 'Onix Plus',
    category: 'Econômico',
    priceWeekly: 799,
    status: 'Disponível',
    image: 'https://cdn.motor1.com/images/mgl/xqowy2/s1/chevrolet-onix-plus-premier-2023-vs.-hyundai-hb20s-platinum-plus-2023.jpg',
    specs: {
      transm: 'Manual',
      seats: '5 lugares',
      fuel: 'Flex',
      consumption: '14,5 km/l'
    },
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia']
  },
  {
    id: 2,
    brand: 'CHEVROLET',
    year: '2024',
    name: 'Onix',
    category: 'Econômico',
    priceWeekly: 749,
    status: 'Disponível',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREOUbjgj9XnoYT3t04NC-dlG4GFQuyu3y7dY83-PoQEA&s=10',
    specs: {
      transm: 'Manual',
      seats: '5 lugares',
      fuel: 'Flex',
      consumption: '14,3 km/l'
    },
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia']
  },
  {
    id: 3,
    brand: 'FIAT',
    year: '2024',
    name: 'Argo Drive',
    category: 'Econômico',
    priceWeekly: 729,
    status: 'Disponível',
    image: 'https://http2.mlstatic.com/D_NQ_NP_913494-MLA74910398809_032024-F.jpg',
    specs: {
      transm: 'Manual',
      seats: '5 lugares',
      fuel: 'Flex',
      consumption: '14,0 km/l'
    },
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia']
  },
  {
    id: 4,
    brand: 'VOLKSWAGEN',
    year: '2024',
    name: 'Polo Track',
    category: 'Econômico',
    priceWeekly: 499,
    status: 'Disponível',
    image: 'https://static.kbb.com.br/Uploads/ResearchTools/News/4426/582a0483-eef4-4116-8ef6-8f663b7fe1b2_1365x1024.jpg',
    specs: {
      transm: 'Manual',
      seats: '5 lugares',
      fuel: 'Flex',
      consumption: '13,8 km/l'
    },
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia']
  },
  {
    id: 5,
    brand: 'HYUNDAI',
    year: '2024',
    name: 'HB20',
    category: 'Econômico',
    priceWeekly: 749,
    status: 'Disponível',
    image: 'https://garagem360.com.br/wp-content/uploads/2023/12/hyundai-hb20-platinum-safety-2024-3.jpg',
    specs: {
      transm: 'Manual',
      seats: '5 lugares',
      fuel: 'Flex',
      consumption: '14,2 km/l'
    },
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia']
  },
  {
    id: 6,
    brand: 'FIAT',
    year: '2024',
    name: 'Cronos Drive',
    category: 'Sedan',
    priceWeekly: 829,
    status: 'Disponível',
    image: 'https://quatrorodas.abril.com.br/wp-content/uploads/2023/08/FiatCronosPrecisionMY24__044-e1693320105233.jpg?quality=70&strip=info&resize=1080,565&crop=1',
    specs: {
      transm: 'Manual',
      seats: '5 lugares',
      fuel: 'Flex',
      consumption: '13,5 km/l'
    },
    features: ['Porta-malas amplo', 'Ar-condicionado', 'Central multimídia']
  },
  {
    id: 7,
    brand: 'HYUNDAI',
    year: '2024',
    name: 'HB20S',
    category: 'Sedan',
    priceWeekly: 829,
    status: 'Disponível',
    image: 'https://image1.mobiauto.com.br/images/api/images/v1.0/256174833/transform/fl_progressive,f_webp,q_80',
    specs: {
      transm: 'Manual',
      seats: '5 lugares',
      fuel: 'Flex',
      consumption: '13,8 km/l'
    },
    features: ['Porta-malas amplo', 'Ar-condicionado', 'Central multimídia']
  },
  {
    id: 8,
    brand: 'VOLKSWAGEN',
    year: '2024',
    name: 'Virtus (Automático)',
    category: 'Sedan',
    priceWeekly: 850,
    status: 'Disponível',
    image: 'https://garagem360.com.br/wp-content/uploads/2023/11/vw-virtus-highline-2024-2.jpg',
    specs: {
      transm: 'Automático',
      seats: '5 lugares',
      fuel: 'Flex',
      consumption: '12,8 km/l'
    },
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia']
  },


  {
    id: 19,
    brand: 'VOLKSWAGEN',
    year: '2024',
    name: 'Virtus (Manual)',
    category: 'Sedan',
    priceWeekly: 899,
    status: 'Disponível',
    image: 'https://garagem360.com.br/wp-content/uploads/2023/11/vw-virtus-highline-2024-2.jpg',
    specs: {
      transm: 'Manual',
      seats: '5 lugares',
      fuel: 'Flex',
      consumption: '12,8 km/l'
    },
    features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia']
  },


  {
    id: 9,
  brand: 'RENAULT',
  year: '2024',
  name: 'Kwid E-Tech',
  category: 'Hatch',
  priceWeekly: 599,
  status: 'Disponível',
  image: 'https://www.webmotors.com.br/imagens/prod/379822/RENAULT_KWID_ETECH_27_KW_ELETRICO_37982214035105449.webp',
  specs: {
    transm: 'Automático',
    seats: '5 lugares',
    fuel: 'Elétrico',
    consumption: '7,5 km/kWh'
  },
  features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia']
},
{
  id: 11,
  brand: 'RENAULT',
  year: '2024',
  name: 'Logan',
  category: 'Sedan',
  priceWeekly: 519,
  status: 'Disponível',
  image: 'https://cdn.wheel-size.com/automobile/body/renault-logan-2019-2026-1770176449.4616737.jpg',
  specs: {
    transm: 'Manual',
    seats: '5 lugares',
    fuel: 'Flex',
    consumption: '13,5 km/l'
  },
  features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia']
},


{
  id: 12,
  brand: 'NISSAN',
  year: '2024',
  name: 'Kicks',
  category: 'SUV',
  priceWeekly: 849,
  status: 'Disponível',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW_D-tS9gA6pmCWVOQKKpi_LoaJEPxUD-yxsz-TS81Ig&s=10',
  specs: {
    transm: 'Automático CVT',
    seats: '5 lugares',
    fuel: 'Flex',
    consumption: '14,2 km/l'
  },
  features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia']
},


{
  id: 18,
  brand: 'TOYOTA',
  year: '2024',
  name: 'Yaris Hatch',
  category: 'Hatch',
  priceWeekly: 765,
  status: 'Disponível',
  image: 'https://www.toyotacomunica.com.br/wp-content/uploads/2023/09/19_COROLLA-2024_XEI_2.png',
  specs: {
    transm: 'Automático CVT',
    seats: '5 lugares',
    fuel: 'Flex',
    consumption: '13,0 km/l'
  },
  features: ['Ar-condicionado', 'Direção elétrica', 'Central multimídia']
}
];


const categories = ['Todos', 'Econômico', 'Sedan'];
const normalizeVehicle = (vehicle) => ({
  ...vehicle,
  priceWeekly: vehicle.priceWeekly ?? vehicle.price_weekly ?? 0,
  specs: vehicle.specs ?? {
    transm: vehicle.transm ?? 'Não informado',
    seats: vehicle.seats ?? 'Não informado',
    fuel: vehicle.fuel ?? 'Não informado',
    consumption: vehicle.consumption ?? 'Não informado'
  },
  features: Array.isArray(vehicle.features) ? vehicle.features : []
});


export default function Vehicles({ onSelectVehicle }) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [vehicles, setVehicles] = useState(localBackupData);


  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const response = await fetch('/api/vehicles');
        if (!response.ok) {
          setVehicles(localBackupData);
          return;
        }


        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setVehicles(data.map(normalizeVehicle));
        } else {
          setVehicles(localBackupData);
        }
      } catch (error) {
        setVehicles(localBackupData);
      }
    };


    loadVehicles();
  }, []);


  const filteredVehicles =
    activeCategory === 'Todos'
      ? vehicles
      : vehicles.filter((vehicle) => vehicle.category === activeCategory);


  return (
    <section id="veiculos" className="section vehicles-section">
      <div className="container">
        <div className="section-header">
          <span
            className="section-tag"
            style={{
              color: 'var(--primary)',
              fontWeight: '700',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
              display: 'block',
              textAlign: 'center'
            }}
          >
            Catálogo de Veículos
          </span>


          <h2 className="section-title">
            Escolha o modelo <span className="gradient-green">ideal para trabalhar de Uber</span>
          </h2>


          <p className="section-subtitle">
            Carros econômicos, confortáveis e preparados para quem trabalha com transporte por aplicativo.
          </p>
        </div>


        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>


        <div className="vehicles-grid">
          {filteredVehicles.map((car) => (
            <div key={car.id} className="glass-card vehicle-card">
              <div className="card-image-box">
                <img src={car.image} alt={`${car.brand} ${car.name}`} className="vehicle-img" />
                <div className="card-overlay"></div>
                <span className="vehicle-category-badge">{car.category}</span>


                <div className={car.status === 'Disponível' ? 'status-badge-green' : 'status-badge-red'}>
                  <span className="dot"></span>
                  <span>{car.status}</span>
                </div>
              </div>


              <div className="card-body">
                <div className="brand-year-info">
                  <span>
                    {car.brand} • {car.year}
                  </span>
                </div>


                <h3 className="vehicle-name">{car.name}</h3>


                <div className="specs-info-grid">
                  <div className="spec-item">
                    <Gauge size={14} className="spec-icon" />
                    <span>{car.specs.transm}</span>
                  </div>


                  <div className="spec-item">
                    <Users size={14} className="spec-icon" />
                    <span>{car.specs.seats}</span>
                  </div>


                  <div className="spec-item">
                    <Fuel size={14} className="spec-icon" />
                    <span>{car.specs.fuel}</span>
                  </div>


                  <div className="spec-item">
                    <Zap size={14} className="spec-icon" />
                    <span>{car.specs.consumption}</span>
                  </div>
                </div>


                <div className="features-row">
                  {Array.isArray(car.features) &&
                    car.features.map((feat, index) => (
                      <span key={index} className="feature-pill">
                        <Check size={12} className="check-icon" />
                        {feat}
                      </span>
                    ))}
                </div>


                <div className="card-footer-action">
                  <div className="price-tag-box">
                    <span className="p-label">A partir de</span>
                    <strong className="p-val">R$ {car.priceWeekly}</strong>
                    <span className="p-unit">/semana</span>
                  </div>


                  <button
                    className="btn btn-outline-green btn-sm"
                    onClick={() => (onSelectVehicle ? onSelectVehicle(car) : null)}
                  >
                    <span>Tenho interesse</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>


        {filteredVehicles.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: 'var(--text-secondary)'
            }}
          >
            Nenhum veículo encontrado nesta categoria.
          </div>
        )}
      </div>
    </section>
  );
}





