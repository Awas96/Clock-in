<?php

namespace App\Entity;

use App\Repository\EventoRepository;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=EventoRepository::class)
 */
class Evento
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     */
    private $fecha;

    /**
     * @ORM\ManyToOne(targetEntity=Usuario::class, inversedBy="evento")
     * @ORM\JoinColumn(nullable=false)
     */
    private $usuario;

    /**
     * @ORM\OneToMany(targetEntity=Incidencia::class, mappedBy="evento", orphanRemoval=true)
     */
    private $incidencia;

    /**
     * @ORM\OneToOne(targetEntity=Fichaje::class, inversedBy="evento", cascade={"persist", "remove"})
     */
    private $fichaje;

    /**
     * @ORM\OneToOne(targetEntity=Turno::class, mappedBy="evento", cascade={"persist", "remove"})
     */
    private $turno;


    public function __construct()
    {
        $this->incidencia = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFecha(): ?DateTimeInterface
    {
        return $this->fecha;
    }

    public function setFecha(DateTimeInterface $fecha): self
    {
        $this->fecha = $fecha;

        return $this;
    }

    public function getUsuario(): ?Usuario
    {
        return $this->usuario;
    }

    public function setUsuario(?Usuario $usuario): self
    {
        $this->usuario = $usuario;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getTurno()
    {
        return $this->turno;
    }

    /**
     * @param mixed $turno
     */
    public function setTurno($turno): void
    {
        $this->turno = $turno;
    }

    /**
     * @return mixed
     */
    public function getFichaje()
    {
        return $this->fichaje;
    }

    /**
     * @param mixed $fichaje
     */
    public function setFichaje($fichaje): void
    {
        $this->fichaje = $fichaje;
    }

    /**
     * @return Collection|Incidencia[]
     */
    public function getIncidencia(): Collection
    {
        return $this->incidencia;
    }

    public function addIncidencium(Incidencia $incidencium): self
    {
        if (!$this->incidencia->contains($incidencium)) {
            $this->incidencia[] = $incidencium;
            $incidencium->setEvento($this);
        }

        return $this;
    }

    public function removeIncidencium(Incidencia $incidencium): self
    {
        if ($this->incidencia->removeElement($incidencium)) {
            // set the owning side to null (unless already changed)
            if ($incidencium->getEvento() === $this) {
                $incidencium->setEvento(null);
            }
        }

        return $this;
    }

}
