<?php

namespace App\Entity;

use App\Repository\IncidenciaRepository;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=IncidenciaRepository::class)
 */
class Incidencia
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $estado;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $motivo;

    /**
     * @ORM\Column(type="datetime")
     */
    private $hora;

    /**
     * @ORM\OneToOne(targetEntity=Evento::class, mappedBy="incidencia", cascade={"persist", "remove"})
     */
    private $evento;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEstado(): ?int
    {
        return $this->estado;
    }

    public function setEstado(int $estado): self
    {
        $this->estado = $estado;

        return $this;
    }

    public function getMotivo(): ?string
    {
        return $this->motivo;
    }

    public function setMotivo(string $motivo): self
    {
        $this->motivo = $motivo;

        return $this;
    }

    public function getHora(): ?DateTimeInterface
    {
        return $this->hora;
    }

    public function setHora(DateTimeInterface $hora): self
    {
        $this->hora = $hora;

        return $this;
    }

    public function getEvento(): ?Evento
    {
        return $this->evento;
    }

    public function setEvento(?Evento $evento): self
    {
        // unset the owning side of the relation if necessary
        if ($evento === null && $this->evento !== null) {
            $this->evento->setIncidencia(null);
        }

        // set the owning side of the relation if necessary
        if ($evento !== null && $evento->getIncidencia() !== $this) {
            $evento->setIncidencia($this);
        }

        $this->evento = $evento;

        return $this;
    }
}
