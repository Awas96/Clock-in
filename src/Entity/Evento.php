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
     * @ORM\OneToMany(targetEntity=Fichaje::class, mappedBy="evento", orphanRemoval=true)
     */
    private $fichaje;

    /**
     * @ORM\OneToMany(targetEntity=Turno::class, mappedBy="evento", orphanRemoval=true)
     */
    private $turno;

    /**
     * @ORM\OneToMany(targetEntity=Incidencia::class, mappedBy="evento", orphanRemoval=true)
     */
    private $incidencia;

    public function __construct()
    {
        $this->fichaje = new ArrayCollection();
        $this->turno = new ArrayCollection();
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
     * @return Collection|Fichaje[]
     */
    public function getFichaje(): Collection
    {
        return $this->fichaje;
    }

    public function addFichaje(Fichaje $fichaje): self
    {
        if (!$this->fichaje->contains($fichaje)) {
            $this->fichaje[] = $fichaje;
            $fichaje->setEvento($this);
        }

        return $this;
    }

    public function removeFichaje(Fichaje $fichaje): self
    {
        if ($this->fichaje->removeElement($fichaje)) {
            // set the owning side to null (unless already changed)
            if ($fichaje->getEvento() === $this) {
                $fichaje->setEvento(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Turno[]
     */
    public function getTurno(): Collection
    {
        return $this->turno;
    }

    public function addTurno(Turno $turno): self
    {
        if (!$this->turno->contains($turno)) {
            $this->turno[] = $turno;
            $turno->setEvento($this);
        }

        return $this;
    }

    public function removeTurno(Turno $turno): self
    {
        if ($this->turno->removeElement($turno)) {
            // set the owning side to null (unless already changed)
            if ($turno->getEvento() === $this) {
                $turno->setEvento(null);
            }
        }

        return $this;
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
